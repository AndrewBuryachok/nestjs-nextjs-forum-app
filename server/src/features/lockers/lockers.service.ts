import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Locker } from './locker.entity';
import { UsersService } from '../users/users.service';
import { CreateLockerWithUserDto, EditLockerDto } from './locker.dto';
import { LockerError } from './locker-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class LockersService {
  constructor(
    @InjectRepository(Locker)
    private lockersRepository: Repository<Locker>,
    private usersService: UsersService,
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

  async createLocker(dto: CreateLockerWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    await this.create(dto);
  }

  async editMyLocker(
    myId: number,
    lockerId: number,
    dto: EditLockerDto,
  ): Promise<void> {
    await this.throwIfNotLockerOwner(lockerId, myId);
    await this.edit(lockerId, dto);
  }

  async editUserLocker(lockerId: number, dto: EditLockerDto): Promise<void> {
    await this.throwIfLockerNotFound(lockerId);
    await this.edit(lockerId, dto);
  }

  async deleteMyLocker(myId: number, lockerId: number): Promise<void> {
    await this.throwIfNotLockerOwner(lockerId, myId);
    await this.delete(lockerId);
  }

  async deleteUserLocker(lockerId: number): Promise<void> {
    await this.throwIfLockerNotFound(lockerId);
    await this.delete(lockerId);
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
  ): Promise<Locker> {
    const locker = await this.throwIfLockerNotFound(lockerId);
    if (locker.userId !== userId) {
      throw new ForbiddenException(LockerError.NOT_OWNER);
    }
    return locker;
  }

  private findLockerById(id: number): Promise<Locker | null> {
    return this.lockersRepository.findOneBy({ id });
  }

  private async create(dto: CreateLockerWithUserDto): Promise<Locker> {
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

  private async edit(id: number, dto: EditLockerDto): Promise<void> {
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
