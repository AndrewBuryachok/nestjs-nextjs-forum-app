import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Account } from './account.entity';
import { Card } from './card.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import {
  DeleteCardDto,
  ExtCreateCardDto,
  ExtEditCardDto,
  ExtUpdateCardUserDto,
  UpdateCardBalanceDto,
} from './card.dto';
import { CardError } from './card-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    private usersService: UsersService,
  ) {}

  async getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    const [data, total] = await this.getCardsQueryBuilder(req)
      .where('card.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllCards(req: Request): Promise<Response<Card>> {
    const [data, total] = await this.getCardsQueryBuilder(req)
      .where('card.userId = account.userId')
      .getManyAndCount();
    return { data, total };
  }

  selectUserCards(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId).getMany();
  }

  selectUserCardsWithBalance(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId)
      .addSelect(['account.balance'])
      .getMany();
  }

  async selectCardUsers(cardId: number): Promise<User[]> {
    const cards = await this.findCardsById(cardId);
    const users = cards.map((card) => card.userId);
    return this.usersService.selectUsersByIds(users);
  }

  async selectNotCardUsers(cardId: number): Promise<User[]> {
    const cards = await this.findCardsById(cardId);
    const users = cards.map((card) => card.userId);
    return this.usersService.selectUsersByNotIds(users);
  }

  async createCard(dto: ExtCreateCardDto): Promise<void> {
    await this.create(dto);
  }

  async editCard(dto: ExtEditCardDto): Promise<void> {
    const card = await this.throwIfNotCardOwner(
      dto.cardId,
      dto.myId,
      dto.isAll,
    );
    await this.edit(card.accountId, dto);
  }

  async deleteCard(dto: DeleteCardDto): Promise<void> {
    const card = await this.throwIfNotCardOwner(
      dto.cardId,
      dto.myId,
      dto.isAll,
    );
    await this.delete(card.accountId);
  }

  async addCardUser(dto: ExtUpdateCardUserDto): Promise<void> {
    const card = await this.throwIfNotCardOwner(
      dto.cardId,
      dto.myId,
      dto.isAll,
    );
    const subCard = await this.findCardByAccountAndUser(
      card.accountId,
      dto.userId,
    );
    if (subCard) {
      throw new BadRequestException(CardError.USER_ALREADY_IN);
    }
    await this.addUser(card.accountId, dto.userId);
  }

  async removeCardUser(dto: ExtUpdateCardUserDto): Promise<void> {
    const card = await this.throwIfNotCardOwner(
      dto.cardId,
      dto.myId,
      dto.isAll,
    );
    if (card.account.userId === dto.userId) {
      throw new BadRequestException(CardError.USER_IS_OWNER);
    }
    const subCard = await this.findCardByAccountAndUser(
      card.accountId,
      dto.userId,
    );
    if (!subCard) {
      throw new BadRequestException(CardError.USER_NOT_IN);
    }
    await this.removeUser(subCard.id);
  }

  async increaseCardBalance(dto: UpdateCardBalanceDto): Promise<void> {
    const card = await this.throwIfCardNotFound(dto.cardId);
    await this.increaseBalance(card.accountId, dto.sum);
  }

  async decreaseCardBalance(dto: UpdateCardBalanceDto): Promise<void> {
    const card = await this.throwIfCardNotFound(dto.cardId);
    if (card.account.balance < dto.sum) {
      throw new BadRequestException(CardError.NOT_ENOUGH_BALANCE);
    }
    await this.decreaseBalance(card.accountId, dto.sum);
  }

  async throwIfCardNotFound(cardId: number): Promise<Card> {
    const card = await this.findCardById(cardId);
    if (!card) {
      throw new NotFoundException(CardError.NOT_FOUND);
    }
    return card;
  }

  async throwIfNotCardOwner(
    cardId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Card> {
    const card = await this.throwIfCardNotFound(cardId);
    if (card.account.userId !== userId && !isAll) {
      throw new ForbiddenException(CardError.NOT_OWNER);
    }
    return card;
  }

  async throwIfNotCardUser(
    cardId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Card> {
    const card = await this.throwIfCardNotFound(cardId);
    if (card.userId !== userId && !isAll) {
      throw new ForbiddenException(CardError.NOT_USER);
    }
    return card;
  }

  private findCardById(id: number): Promise<Card | null> {
    return this.cardsRepository.findOne({
      relations: { account: true },
      where: { id },
    });
  }

  private findCardByAccountAndUser(
    accountId: number,
    userId: number,
  ): Promise<Card | null> {
    return this.cardsRepository.findOneBy({ accountId, userId });
  }

  private findCardsById(id: number): Promise<Card[]> {
    return this.cardsRepository.findBy({ account: { cards: { id } } });
  }

  private async create(dto: ExtCreateCardDto): Promise<Card> {
    try {
      const account = this.accountsRepository.create({
        userId: dto.userId,
        name: dto.name,
      });
      await this.accountsRepository.save(account);
      const card = this.cardsRepository.create({
        accountId: account.id,
        userId: dto.userId,
      });
      await this.cardsRepository.save(card);
      return card;
    } catch (error) {
      throw new InternalServerErrorException(CardError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: ExtEditCardDto): Promise<void> {
    try {
      await this.accountsRepository.update({ id }, { name: dto.name });
    } catch (error) {
      throw new InternalServerErrorException(CardError.EDIT_FAILED);
    }
  }

  private async delete(accountId: number): Promise<void> {
    try {
      await this.cardsRepository.softDelete({ accountId });
    } catch (error) {
      throw new InternalServerErrorException(CardError.DELETE_FAILED);
    }
  }

  private async addUser(accountId: number, userId: number): Promise<void> {
    try {
      const card = this.cardsRepository.create({ accountId, userId });
      await this.cardsRepository.save(card);
    } catch (error) {
      throw new InternalServerErrorException(CardError.ADD_USER_FAILED);
    }
  }

  private async removeUser(id: number): Promise<void> {
    try {
      await this.cardsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(CardError.REMOVE_USER_FAILED);
    }
  }

  private async increaseBalance(id: number, sum: number): Promise<void> {
    try {
      await this.accountsRepository.increment({ id }, 'balance', sum);
    } catch (error) {
      throw new InternalServerErrorException(CardError.INCREASE_BALANCE_FAILED);
    }
  }

  private async decreaseBalance(id: number, sum: number): Promise<void> {
    try {
      await this.accountsRepository.decrement({ id }, 'balance', sum);
    } catch (error) {
      throw new InternalServerErrorException(CardError.DECREASE_BALANCE_FAILED);
    }
  }

  private selectCardsQueryBuilder(userId: number): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id'])
      .innerJoin('card.account', 'account')
      .addSelect(['account.id', 'account.name'])
      .innerJoin('account.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .where('card.userId = :userId', { userId })
      .orderBy('account.name', 'ASC');
  }

  private getCardsQueryBuilder(req: Request): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id'])
      .innerJoin('card.account', 'account')
      .addSelect([
        'account.id',
        'account.name',
        'account.balance',
        'account.createdAt',
      ])
      .innerJoin('account.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .loadRelationCountAndMap('account.users', 'account.cards')
      .orderBy('card.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
