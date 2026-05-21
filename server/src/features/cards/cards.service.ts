import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Card } from './card.entity';
import { CardUser } from './card-user.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import {
  CreateCardWithUserDto,
  EditCardDto,
  UpdateCardUserDto,
} from './card.dto';
import { CardError } from './card-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(CardUser)
    private cardsUsersRepository: Repository<CardUser>,
    private usersService: UsersService,
  ) {}

  async getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    const [data, total] = await this.getCardsQueryBuilder(req)
      .innerJoin('card.cardUsers', 'cardUsers')
      .where('cardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllCards(req: Request): Promise<Response<Card>> {
    const [data, total] =
      await this.getCardsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  selectUserCards(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId).getMany();
  }

  selectUserCardsWithBalance(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId)
      .addSelect(['card.balance'])
      .getMany();
  }

  async selectCardUsers(cardId: number): Promise<User[]> {
    const cardUsers = await this.findUsersByCard(cardId);
    const users = cardUsers.map((cardUser) => cardUser.userId);
    return this.usersService.selectUsersByIds(users);
  }

  async selectNotCardUsers(cardId: number): Promise<User[]> {
    const cardUsers = await this.findUsersByCard(cardId);
    const users = cardUsers.map((cardUser) => cardUser.userId);
    return this.usersService.selectUsersByNotIds(users);
  }

  async createCard(dto: CreateCardWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    await this.create(dto);
  }

  async editMyCard(
    myId: number,
    cardId: number,
    dto: EditCardDto,
  ): Promise<void> {
    await this.throwIfNotCardOwner(cardId, myId);
    await this.edit(cardId, dto);
  }

  async editUserCard(cardId: number, dto: EditCardDto): Promise<void> {
    await this.throwIfCardNotFound(cardId);
    await this.edit(cardId, dto);
  }

  async deleteMyCard(myId: number, cardId: number): Promise<void> {
    await this.throwIfNotCardOwner(cardId, myId);
    await this.delete(cardId);
  }

  async deleteUserCard(cardId: number): Promise<void> {
    await this.throwIfCardNotFound(cardId);
    await this.delete(cardId);
  }

  async addMyCardUser(
    myId: number,
    cardId: number,
    dto: UpdateCardUserDto,
  ): Promise<void> {
    const card = await this.throwIfNotCardOwner(cardId, myId);
    await this.addCardUser(card, dto.userId);
  }

  async addUserCardUser(cardId: number, dto: UpdateCardUserDto): Promise<void> {
    const card = await this.throwIfCardNotFound(cardId);
    await this.addCardUser(card, dto.userId);
  }

  private async addCardUser(card: Card, userId: number): Promise<void> {
    const isCardUser = await this.isCardUser(card.id, userId);
    if (isCardUser) {
      throw new BadRequestException(CardError.USER_ALREADY_IN);
    }
    await this.addUser(card.id, userId);
  }

  async removeMyCardUser(
    myId: number,
    cardId: number,
    dto: UpdateCardUserDto,
  ): Promise<void> {
    const card = await this.throwIfNotCardOwner(cardId, myId);
    await this.removeCardUser(card, dto.userId);
  }

  async removeUserCardUser(
    cardId: number,
    dto: UpdateCardUserDto,
  ): Promise<void> {
    const card = await this.throwIfCardNotFound(cardId);
    await this.removeCardUser(card, dto.userId);
  }

  private async removeCardUser(card: Card, userId: number): Promise<void> {
    if (card.userId === userId) {
      throw new BadRequestException(CardError.USER_IS_OWNER);
    }
    const isCardUser = await this.isCardUser(card.id, userId);
    if (!isCardUser) {
      throw new BadRequestException(CardError.USER_NOT_IN);
    }
    await this.removeUser(card.id, userId);
  }

  async increaseCardBalance(
    cardId: number,
    userId: number,
    sum: number,
  ): Promise<void> {
    await this.throwIfNotCardUser(cardId, userId);
    await this.increaseBalance(cardId, sum);
  }

  async decreaseCardBalance(
    cardId: number,
    userId: number,
    sum: number,
  ): Promise<void> {
    const card = await this.throwIfNotCardUser(cardId, userId);
    if (card.balance < sum) {
      throw new BadRequestException(CardError.NOT_ENOUGH_BALANCE);
    }
    await this.decreaseBalance(cardId, sum);
  }

  async throwIfCardNotFound(cardId: number): Promise<Card> {
    const card = await this.findCardById(cardId);
    if (!card) {
      throw new NotFoundException(CardError.NOT_FOUND);
    }
    return card;
  }

  async throwIfNotCardOwner(cardId: number, userId: number): Promise<Card> {
    const card = await this.throwIfCardNotFound(cardId);
    if (card.userId !== userId) {
      throw new ForbiddenException(CardError.NOT_OWNER);
    }
    return card;
  }

  async throwIfNotCardUser(cardId: number, userId: number): Promise<Card> {
    const card = await this.throwIfCardNotFound(cardId);
    const isCardUser = await this.isCardUser(cardId, userId);
    if (!isCardUser) {
      throw new ForbiddenException(CardError.NOT_USER);
    }
    return card;
  }

  async isCardUser(cardId: number, userId: number): Promise<boolean> {
    await this.usersService.throwIfUserNotFound(userId);
    const cardUser = await this.findUserByCardAndUser(cardId, userId);
    return !!cardUser;
  }

  private findCardById(id: number): Promise<Card | null> {
    return this.cardsRepository.findOneBy({ id });
  }

  private findUserByCardAndUser(
    cardId: number,
    userId: number,
  ): Promise<CardUser | null> {
    return this.cardsUsersRepository.findOneBy({ cardId, userId });
  }

  private findUsersByCard(cardId: number): Promise<CardUser[]> {
    return this.cardsUsersRepository.findBy({ cardId });
  }

  @Transactional()
  private async create(dto: CreateCardWithUserDto): Promise<Card> {
    try {
      const card = this.cardsRepository.create({
        userId: dto.userId,
        name: dto.name,
      });
      await this.cardsRepository.save(card);
      const cardUser = this.cardsUsersRepository.create({
        cardId: card.id,
        userId: dto.userId,
      });
      await this.cardsUsersRepository.save(cardUser);
      return card;
    } catch (error) {
      throw new InternalServerErrorException(CardError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: EditCardDto): Promise<void> {
    try {
      await this.cardsRepository.update({ id }, { name: dto.name });
    } catch (error) {
      throw new InternalServerErrorException(CardError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.cardsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(CardError.DELETE_FAILED);
    }
  }

  private async addUser(cardId: number, userId: number): Promise<void> {
    try {
      const cardUser = this.cardsUsersRepository.create({ cardId, userId });
      await this.cardsUsersRepository.save(cardUser);
    } catch (error) {
      throw new InternalServerErrorException(CardError.ADD_USER_FAILED);
    }
  }

  private async removeUser(cardId: number, userId: number): Promise<void> {
    try {
      await this.cardsUsersRepository.softDelete({ cardId, userId });
    } catch (error) {
      throw new InternalServerErrorException(CardError.REMOVE_USER_FAILED);
    }
  }

  private async increaseBalance(id: number, sum: number): Promise<void> {
    try {
      await this.cardsRepository.increment({ id }, 'balance', sum);
    } catch (error) {
      throw new InternalServerErrorException(CardError.INCREASE_BALANCE_FAILED);
    }
  }

  private async decreaseBalance(id: number, sum: number): Promise<void> {
    try {
      await this.cardsRepository.decrement({ id }, 'balance', sum);
    } catch (error) {
      throw new InternalServerErrorException(CardError.DECREASE_BALANCE_FAILED);
    }
  }

  private selectCardsQueryBuilder(userId: number): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id', 'card.name'])
      .innerJoin('card.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('card.cardUsers', 'cardUsers')
      .where('cardUsers.userId = :userId', { userId })
      .orderBy('card.name', 'ASC');
  }

  private getCardsQueryBuilder(req: Request): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id', 'card.name', 'card.balance', 'card.createdAt'])
      .innerJoin('card.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .loadRelationCountAndMap('card.users', 'card.cardUsers')
      .orderBy('card.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
