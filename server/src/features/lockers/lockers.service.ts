import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Locker } from './locker.entity';
import {
  DeleteLockerDto,
  ExtCreateLockerDto,
  ExtEditLockerDto,
} from './locker.dto';
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

  async editLocker(dto: ExtEditLockerDto): Promise<void> {
    await this.throwIfNotLockerOwner(dto.lockerId, dto.myId, dto.isAll);
    await this.edit(dto.lockerId, dto);
  }

  async deleteLocker(dto: DeleteLockerDto): Promise<void> {
    await this.throwIfNotLockerOwner(dto.lockerId, dto.myId, dto.isAll);
    await this.delete(dto.lockerId);
  }

  async throwIfLockerNotFound(lockerId: number): Promise<Locker> {
    const locker = await this.findLockerById(lockerId);
    if (!locker) {
      throw new NotFoundException(LockerError.NOT_FOUND);
    }
    return locker;
  }

  async throwIfNotLockerOwner(
    lockerId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Locker> {
    const locker = await this.throwIfLockerNotFound(lockerId);
    if (locker.userId !== userId && !isAll) {
      throw new ForbiddenException(LockerError.NOT_OWNER);
    }
    return locker;
  }

  private findLockerById(id: number): Promise<Locker | null> {
    return this.lockersRepository.findOneBy({ id });
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

  private async edit(id: number, dto: ExtEditLockerDto): Promise<void> {
    try {
      await this.lockersRepository.update(
        { id },
        { name: dto.name, x: dto.x, y: dto.y },
      );
    } catch (error) {
      throw new InternalServerErrorException(LockerError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.lockersRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(LockerError.DELETE_FAILED);
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
