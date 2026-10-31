import mqtt from 'mqtt';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Notification } from '../../common/enums';
import { postData } from '../../common/utils';

@Injectable()
export class MqttService {
  private logger = new Logger(MqttService.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

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

  private publish(topic: string) {}
}
