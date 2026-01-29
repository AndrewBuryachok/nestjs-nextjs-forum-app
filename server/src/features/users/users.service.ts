import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  selectAllUsers(): Promise<User[]> {
    return this.selectUsersQueryBuilder().getMany();
  }

  private selectUsersQueryBuilder(): SelectQueryBuilder<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nick', 'user.avatar'])
      .orderBy('user.nick', 'ASC');
  }
}
