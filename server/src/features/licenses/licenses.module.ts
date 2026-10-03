import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './license.entity';
import { UsersModule } from '../users/users.module';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([License]), UsersModule],
  controllers: [LicensesController],
  providers: [LicensesService],
})
export class LicensesModule {}
