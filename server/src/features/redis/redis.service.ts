import Redis from 'ioredis';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);

  private client: Redis;

  constructor(private configService: ConfigService) {
    this.client = new Redis(this.configService.getOrThrow('REDIS_URL'), {
      lazyConnect: true,
      connectTimeout: 5000,
      maxRetriesPerRequest: 2,
    });
    this.client.on('connect', () => {
      this.logger.log('Redis connect');
    });
    this.client.on('ready', () => {
      this.logger.log('Redis ready');
    });
    this.client.on('close', () => {
      this.logger.error('Redis close');
    });
    this.client.on('error', (error) => {
      this.logger.error(error.message);
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      this.logger.debug(`GET ${key} ${value}`);
      return value;
    } catch (error) {
      this.logger.error(`Failed to get ${key}`);
      this.logger.error(error);
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
      this.logger.debug(`SET ${key} ${value}`);
    } catch (error) {
      this.logger.error(`Failed to set ${key} ${value}`);
      this.logger.error(error);
    }
  }

  async incrBy(key: string, value: number): Promise<void> {
    try {
      const result = await this.client.incrby(key, value);
      this.logger.debug(`INCRBY ${key} ${value} ${result}`);
    } catch (error) {
      this.logger.error(`Failed to incrBy ${key} ${value}`);
      this.logger.error(error);
    }
  }

  async decrBy(key: string, value: number): Promise<void> {
    try {
      const result = await this.client.decrby(key, value);
      this.logger.debug(`DECRBY ${key} ${value} ${result}`);
    } catch (error) {
      this.logger.error(`Failed to decrBy ${key} ${value}`);
      this.logger.error(error);
    }
  }
}
