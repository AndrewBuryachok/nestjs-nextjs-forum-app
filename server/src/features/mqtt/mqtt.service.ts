import mqtt from 'mqtt';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { Notification } from '../../common/enums';
import { postData } from '../../common/utils';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(MqttService.name);

  private client: mqtt.MqttClient;

  private notifications = new Map<string, Date>();

  private unnotifications = new Map<string, Set<number>>();

  constructor(
    private configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    this.client = mqtt.connect(this.configService.getOrThrow('MQTT_URL'), {
      protocolVersion: 5,
    });
    this.client.on('connect', async () => {
      this.logger.log('MQTT connect');
      this.notifications.clear();
      this.unnotifications.clear();
      try {
        await this.usersService.resetUserOnline();
      } catch (error) {
        this.logger.error(error);
      }
      this.client.subscribe(
        ['users/+', 'notifications/+/+/+/+/+', 'unnotifications/+/+/+/+/+'].map(
          (topic) => `${this.configService.getOrThrow('MQTT_TOPIC')}/${topic}`,
        ),
      );
    });
    this.client.on('offline', () => {
      this.logger.error('MQTT offline');
    });
    this.client.on('error', (error) => {
      this.logger.error(error.message);
    });
    this.client.on('message', async (topic, payload) => {
      const [_, type, user, ...rest] = topic.split('/');
      const userId = Number(user);
      if (type === 'users') {
        try {
          await this.usersService.setUserOnline(userId, !!payload.length);
        } catch (error) {
          this.logger.error(error);
        }
      }
      if (type === 'notifications') {
        const key = `${userId}/${rest.join('/')}`;
        if (payload.length) {
          this.notifications.set(key, new Date(payload.toString()));
          this.logger.debug(
            `Successfully added notification ${key} (${this.notifications.size})`,
          );
        } else {
          this.notifications.delete(key);
          this.logger.debug(
            `Successfully removed notification ${key} (${this.notifications.size})`,
          );
          if (!userId) {
            const users = this.unnotifications.get(key);
            if (users) {
              for (const id of users) {
                this.unpublish(`unnotifications/${id}/${rest.join('/')}`);
              }
            }
          }
        }
      }
      if (type === 'unnotifications') {
        const key = `0/${rest.join('/')}`;
        if (payload.length) {
          if (!this.unnotifications.has(key)) {
            this.unnotifications.set(key, new Set());
            this.logger.debug(
              `Successfully added unnotification key ${key} (${this.unnotifications.size})`,
            );
          }
          const users = this.unnotifications.get(key);
          if (users) {
            users.add(userId);
            this.logger.debug(
              `Successfully added unnotification ${key} (${this.unnotifications.size}) for ${userId} (${users.size})`,
            );
          }
        } else {
          const users = this.unnotifications.get(key);
          if (users) {
            users.delete(userId);
            this.logger.debug(
              `Successfully removed unnotification ${key} (${this.unnotifications.size}) for ${userId} (${users.size})`,
            );
            if (!users.size) {
              this.unnotifications.delete(key);
              this.logger.debug(
                `Successfully removed unnotification key ${key} (${this.unnotifications.size})`,
              );
            }
          }
        }
      }
    });
  }

  onModuleDestroy() {
    this.client.end();
  }

  @Cron('0 0 * * *')
  clearNotifications() {
    for (const [key, value] of this.unnotifications) {
      if (!this.notifications.has(key)) {
        const [_, ...rest] = key.split('/');
        for (const id of value) {
          this.unpublish(`unnotifications/${id}/${rest.join('/')}`);
        }
      }
    }
    const date = new Date();
    date.setDate(date.getDate() - 3);
    for (const [key, value] of this.notifications) {
      if (value < date) {
        this.unpublish(`notifications/${key}`);
      }
    }
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

  unpublishNotification(
    fromUserId: number,
    toUserId: number,
    id: number,
    notification: Notification,
  ) {
    const [action, page] = notification.split(' ');
    this.unpublish(
      `notifications/${toUserId}/${page}/${id}/${action}/${fromUserId}`,
    );
  }

  private publish(topic: string) {
    this.client.publish(
      `${this.configService.getOrThrow('MQTT_TOPIC')}/${topic}`,
      new Date().toISOString(),
      { retain: true, properties: { messageExpiryInterval: 3 * 24 * 60 * 60 } },
    );
    this.logger.debug(`Successfully published topic ${topic}`);
  }

  private unpublish(topic: string) {
    this.client.publish(
      `${this.configService.getOrThrow('MQTT_TOPIC')}/${topic}`,
      '',
      { retain: true },
    );
    this.logger.debug(`Successfully unpublished topic ${topic}`);
  }
}
