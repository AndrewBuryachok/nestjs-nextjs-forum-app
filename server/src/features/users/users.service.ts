import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';
import { UserError } from './user-errors.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  selectAllUsers(): Promise<User[]> {
    return this.selectUsersQueryBuilder().getMany();
  }

  async throwIfUserNotFound(userId: number): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException(UserError.NOT_FOUND);
    }
    return user;
  }

  private findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  private selectUsersQueryBuilder(): SelectQueryBuilder<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nick', 'user.avatar'])
      .orderBy('user.nick', 'ASC');
  }
}
