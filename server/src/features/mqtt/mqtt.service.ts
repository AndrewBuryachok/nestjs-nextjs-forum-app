import mqtt from 'mqtt';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { Notification } from '../../common/enums';
import { postData } from '../../common/utils';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(MqttService.name);

  private client: mqtt.MqttClient;

  constructor(
    private configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    await this.usersService.resetUserOnline();
    this.client = mqtt.connect(this.configService.getOrThrow('MQTT_URL'), {
      protocolVersion: 5,
    });
    this.client.on('connect', () => {
      this.logger.log('MQTT connect');
      this.client.subscribe(
        `${this.configService.getOrThrow('MQTT_TOPIC')}/users/+`,
      );
    });
    this.client.on('offline', () => {
      this.logger.error('MQTT offline');
    });
    this.client.on('error', (error) => {
      this.logger.error(error.message);
    });
    this.client.on('message', async (topic, payload) => {
      try {
        const userId = Number(topic.split('/')[2]);
        const isOnline = !!payload.length;
        await this.usersService.setUserOnline(userId, isOnline);
      } catch (error) {
        this.logger.error(error);
      }
    });
  }

  onModuleDestroy() {
    this.client.end();
  }

  async sendMessage(
    fromUserId: number,
    toUserId: number,
    message: string,
    keep: boolean,
  ) {
    const fromUser =
      fromUserId && (await this.usersService.throwIfUserNotFound(fromUserId));
    const toUser = await this.usersService.throwIfUserNotFound(toUserId);
    const text = fromUser ? `${fromUser.nick} ${message}` : message;
    try {
      await postData(
        this.configService.getOrThrow('NOTIFICATIONS_URL'),
        this.configService.getOrThrow('AUTH_TOKEN'),
        { type: 'text', nick: toUser.nick, text, keep },
      );
      this.logger.debug(`Successfully sent message ${text} to ${toUser.nick}`);
    } catch (error) {
      this.logger.error(`Failed to sent message ${text} to ${toUser.nick}`);
      this.logger.error(error);
    }
  }

  scheduleNotification(
    key: string,
    date: Date,
    fromUserId: number,
    toUserId: number,
    id: number,
    notification: Notification,
    message: string,
  ) {
    try {
      const delay = date.getTime() - Date.now();
      if (delay > 0 && delay < 24 * 24 * 60 * 60 * 1000) {
        const timeout = setTimeout(async () => {
          this.publishNotification(fromUserId, toUserId, id, notification);
          await this.sendMessage(fromUserId, toUserId, message, true);
        }, delay);
        this.schedulerRegistry.addTimeout(key, timeout);
        this.logger.debug(
          `Successfully scheduled notification ${key} at ${date.toISOString()}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to schedule notification ${key} at ${date.toISOString()}`,
      );
      this.logger.error(error);
    }
  }

  unscheduleNotification(key: string) {
    try {
      if (this.schedulerRegistry.doesExist('timeout', key)) {
        this.schedulerRegistry.deleteTimeout(key);
        this.logger.debug(`Successfully unscheduled notification ${key}`);
      }
    } catch (error) {
      this.logger.error(`Failed to unschedule notification ${key}`);
      this.logger.error(error);
    }
  }

  publishNotification(
    fromUserId: number,
    toUserId: number,
    id: number,
    notification: Notification,
  ) {
    const [action, page] = notification.split(' ');
    this.publish(
      `notifications/${toUserId}/${page}/${id}/${action}/${fromUserId}`,
    );
  }

  private publish(topic: string) {
    this.client.publish(
      `${this.configService.getOrThrow('MQTT_TOPIC')}/${topic}`,
      new Date().toISOString(),
      { retain: true, properties: { messageExpiryInterval: 3 * 24 * 60 * 60 } },
    );
  }
}
