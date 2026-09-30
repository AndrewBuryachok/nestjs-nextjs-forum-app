import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TownUser } from './town-user.entity';
import { ResidentError } from './resident-errors.enum';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(TownUser)
    private townsUsersRepository: Repository<TownUser>,
  ) {}

  async createResident(townId: number, userId: number): Promise<void> {
    await this.create(townId, userId);
  }

  async throwIfResidentAlreadyExists(userId: number): Promise<void> {
    const townUser = await this.townsUsersRepository.findOneBy({ userId });
    if (townUser) {
      throw new BadRequestException(ResidentError.ALREADY_EXISTS);
    }
  }

  private async create(townId: number, userId: number): Promise<TownUser> {
    try {
      const townUser = this.townsUsersRepository.create({ townId, userId });
      await this.townsUsersRepository.save(townUser);
      return townUser;
    } catch (error) {
      throw new InternalServerErrorException(ResidentError.CREATE_FAILED);
    }
  }
}
