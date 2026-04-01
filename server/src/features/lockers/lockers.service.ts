import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Locker } from './locker.entity';
import { ExtCreateLockerDto } from './locker.dto';
import { LockerError } from './locker-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class LockersService {
  constructor(
    @InjectRepository(Locker)
    private lockersRepository: Repository<Locker>,
  ) {}

  async getMainLockers(req: Request): Promise<Response<Locker>> {
    const [data, total] =
      await this.getLockersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyLockers(myId: number, req: Request): Promise<Response<Locker>> {
    const [data, total] = await this.getLockersQueryBuilder(req)
      .where('ownerUser.id = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllLockers(req: Request): Promise<Response<Locker>> {
    const [data, total] =
      await this.getLockersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createLocker(dto: ExtCreateLockerDto): Promise<void> {
    await this.create(dto);
  }

  private async create(dto: ExtCreateLockerDto): Promise<Locker> {
    try {
      const locker = this.lockersRepository.create({
        userId: dto.userId,
        name: dto.name,
        x: dto.x,
        y: dto.y,
      });
      await this.lockersRepository.save(locker);
      return locker;
    } catch (error) {
      throw new InternalServerErrorException(LockerError.CREATE_FAILED);
    }
  }

  private getLockersQueryBuilder(req: Request): SelectQueryBuilder<Locker> {
    return this.lockersRepository
      .createQueryBuilder('locker')
      .select([
        'locker.id',
        'locker.name',
        'locker.x',
        'locker.y',
        'locker.createdAt',
      ])
      .innerJoin('locker.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .orderBy('locker.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
