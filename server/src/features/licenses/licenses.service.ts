import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './license.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { LicenseError } from './license-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class LicensesService {
  constructor(
    @InjectRepository(License)
    private licensesRepository: Repository<License>,
    private usersService: UsersService,
  ) {}

  getMainLicenses(req: Request): Promise<Response<User>> {
    return this.usersService.getLicenseUsers(req);
  }

  async createLicense(userId: number): Promise<void> {
    await this.usersService.throwIfUserNotFound(userId);
    const license = await this.findLicenseByUser(userId);
    if (license) {
      throw new BadRequestException(LicenseError.ALREADY_HAVE);
    }
    await this.create(userId);
  }

  async deleteLicense(userId: number): Promise<void> {
    await this.usersService.throwIfUserNotFound(userId);
    const license = await this.findLicenseByUser(userId);
    if (!license) {
      throw new BadRequestException(LicenseError.NOT_HAVE);
    }
    await this.delete(license.id);
  }

  private findLicenseByUser(userId: number): Promise<License | null> {
    return this.licensesRepository.findOneBy({ userId });
  }

  private async create(userId: number): Promise<License> {
    try {
      const license = this.licensesRepository.create({ userId });
      await this.licensesRepository.save(license);
      return license;
    } catch (error) {
      throw new InternalServerErrorException(LicenseError.CREATE_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.licensesRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(LicenseError.DELETE_FAILED);
    }
  }
}
