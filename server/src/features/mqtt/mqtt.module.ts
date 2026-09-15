import { Global, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MqttService } from './mqtt.service';

@Global()
@Module({
  imports: [UsersModule],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
