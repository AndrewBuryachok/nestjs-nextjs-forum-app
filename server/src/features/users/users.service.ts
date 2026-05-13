import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, ExtUpdateUserRoleDto } from './user.dto';
import { UserError } from './user-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getMainUsers(req: Request): Promise<Response<User>> {
    const [data, total] =
      await this.getUsersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getAllUsers(req: Request): Promise<Response<User>> {
    const [data, total] =
      await this.getUsersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  selectAllUsers(): Promise<User[]> {
    return this.selectUsersQueryBuilder().getMany();
  }

  selectUsersByIds(ids: number[]): Promise<User[]> {
    return this.selectUsersQueryBuilder()
      .where('user.id = ANY (:ids)', { ids })
      .getMany();
  }

  selectUsersByNotIds(ids: number[]): Promise<User[]> {
    return this.selectUsersQueryBuilder()
      .where('user.id != ALL (:ids)', { ids })
      .getMany();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    await this.throwIfNickAlreadyUsed(dto.nick);
    const user = await this.create(dto);
    return user;
  }

  async setUserToken(userId: number, token: string): Promise<void> {
    await this.setToken(userId, token);
  }

  async resetUserToken(userId: number): Promise<void> {
    await this.resetToken(userId);
  }

  async addUserRole(dto: ExtUpdateUserRoleDto): Promise<void> {
    const user = await this.throwIfUserNotFound(dto.userId);
    if (user.roles.includes(dto.role)) {
      throw new BadRequestException(UserError.ALREADY_HAVE_ROLE);
    }
    await this.addRole(user, dto.role);
  }

  async removeUserRole(dto: ExtUpdateUserRoleDto): Promise<void> {
    const user = await this.throwIfUserNotFound(dto.userId);
    if (!user.roles.includes(dto.role)) {
      throw new BadRequestException(UserError.NOT_HAVE_ROLE);
    }
    await this.removeRole(user, dto.role);
  }

  async throwIfNickAlreadyUsed(nick: string): Promise<void> {
    const user = await this.findUserByNick(nick);
    if (user) {
      throw new BadRequestException(UserError.NICK_ALREADY_USED);
    }
  }

  async throwIfUserNotFound(userId: number): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException(UserError.NOT_FOUND);
    }
    return user;
  }

  findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findUserByNick(nick: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ nick });
  }

  private async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create({
        nick: dto.nick,
        password: dto.password,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(UserError.CREATE_FAILED);
    }
  }

  private async setToken(id: number, token: string): Promise<void> {
    try {
      await this.usersRepository.update({ id }, { token });
    } catch (error) {
      throw new InternalServerErrorException(UserError.SET_TOKEN_FAILED);
    }
  }

  private async resetToken(id: number): Promise<void> {
    try {
      await this.usersRepository.update({ id }, { token: '' });
    } catch (error) {
      throw new InternalServerErrorException(UserError.RESET_TOKEN_FAILED);
    }
  }

  private async addRole(user: User, role: Role): Promise<void> {
    try {
      user.roles.push(role);
      await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(UserError.ADD_ROLE_FAILED);
    }
  }

  private async removeRole(user: User, role: Role): Promise<void> {
    try {
      user.roles = user.roles.filter((r) => r !== role);
      await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(UserError.REMOVE_ROLE_FAILED);
    }
  }

  private selectUsersQueryBuilder(): SelectQueryBuilder<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nick', 'user.avatar'])
      .orderBy('user.nick', 'ASC');
  }

  private getUsersQueryBuilder(req: Request): SelectQueryBuilder<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.nick',
        'user.avatar',
        'user.roles',
        'user.createdAt',
      ])
      .orderBy('user.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
