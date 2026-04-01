import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { User } from '../../features/users/user.entity';
import { Account } from '../../features/cards/account.entity';
import { Card } from '../../features/cards/card.entity';
import { Transaction } from '../../features/transactions/transaction.entity';
import { Shop } from '../../features/shops/shop.entity';
import { Good } from '../../features/goods/good.entity';
import { Purchase } from '../../features/purchases/purchase.entity';
import { Locker } from '../../features/lockers/locker.entity';

export default class AppSeeder implements Seeder {
  public async run(_, factoryManager: SeederFactoryManager) {
    const userFactory = factoryManager.get(User);
    const users = await Promise.all(
      Array.from({ length: 20 }).map((_, i) => {
        const id = i + 1;
        return userFactory.make({ id });
      }),
    );
    const accountFactory = factoryManager.get(Account);
    const accounts = await Promise.all(
      Array.from({ length: 40 }).map((_, i) => {
        const id = i + 1;
        const user = faker.helpers.arrayElement(users);
        return accountFactory.make({ id, user });
      }),
    );
    const cardFactory = factoryManager.get(Card);
    const accountsUsers = accounts.flatMap((account) =>
      [
        account.user,
        ...faker.helpers.arrayElements(
          users.filter((user) => user.id !== account.user.id),
          { min: 0, max: 9 },
        ),
      ].map((user) => ({ account, user })),
    );
    const cards = await Promise.all(
      accountsUsers.map(({ account, user }, i) => {
        const id = i + 1;
        return cardFactory.make({ id, account, user });
      }),
    );
    const transactionFactory = factoryManager.get(Transaction);
    const transactions = await Promise.all(
      Array.from({ length: 40 }).map(() => {
        const executorUser = faker.helpers.arrayElement(users);
        const sum = faker.number.int({ min: 1, max: 1000 });
        if (faker.number.int(8) !== 0) {
          const description = 'deposit';
          const receiverCard = faker.helpers.arrayElement(cards);
          receiverCard.account.balance += sum;
          return transactionFactory.make({
            executorUser,
            receiverCard,
            sum,
            description,
          });
        } else {
          const description = 'withdraw';
          const senderCard = faker.helpers.arrayElement(
            cards.filter((card) => card.account.balance >= sum),
          );
          senderCard.account.balance -= sum;
          return transactionFactory.make({
            executorUser,
            senderCard,
            sum,
            description,
          });
        }
      }),
    );
    const transfers = await Promise.all(
      Array.from({ length: 40 }).map(() => {
        const sum = faker.number.int({ min: 1, max: 1000 });
        const description = faker.lorem.words(2);
        const senderCard = faker.helpers.arrayElement(
          cards.filter((card) => card.account.balance >= sum),
        );
        const receiverCard = faker.helpers.arrayElement(cards);
        senderCard.account.balance -= sum;
        receiverCard.account.balance += sum;
        return transactionFactory.make({
          senderCard,
          receiverCard,
          sum,
          description,
        });
      }),
    );
    transactions.push(...transfers);
    const shopFactory = factoryManager.get(Shop);
    const shops = await Promise.all(
      Array.from({ length: 20 }).map((_, i) => {
        const id = i + 1;
        const card = faker.helpers.arrayElement(cards);
        return shopFactory.make({ id, card });
      }),
    );
    const goodFactory = factoryManager.get(Good);
    const goods = await Promise.all(
      Array.from({ length: 40 }).map((_, i) => {
        const id = i + 1;
        const shop = faker.helpers.arrayElement(shops);
        return goodFactory.make({ id, shop });
      }),
    );
    const purchaseFactory = factoryManager.get(Purchase);
    const purchases = await Promise.all(
      Array.from({ length: 40 }).map(async () => {
        const good = faker.helpers.arrayElement(
          goods.filter((good) => good.amount > 0),
        );
        const card = faker.helpers.arrayElement(
          cards.filter((card) => card.account.balance >= good.price),
        );
        const amount = faker.number.int({
          min: 1,
          max: Math.min(good.amount, card.account.balance / good.price),
        });
        good.amount -= amount;
        const price = good.price;
        const transfer = await transactionFactory.make({
          senderCard: card,
          receiverCard: good.shop.card,
          sum: amount * price,
          description: 'купівля товару',
        });
        transactions.push(transfer);
        return purchaseFactory.make({ good, card, amount, price });
      }),
    );
    const lockerFactory = factoryManager.get(Locker);
    const lockers = await Promise.all(
      Array.from({ length: 20 }).map((_, i) => {
        const id = i + 1;
        const user = faker.helpers.arrayElement(users);
        return lockerFactory.make({ id, user });
      }),
    );
    for (const user of users) {
      await userFactory.save(user);
    }
    for (const account of accounts) {
      await accountFactory.save(account);
    }
    for (const card of cards) {
      await cardFactory.save(card);
    }
    for (const transaction of transactions) {
      await transactionFactory.save(transaction);
    }
    for (const shop of shops) {
      await shopFactory.save(shop);
    }
    for (const good of goods) {
      await goodFactory.save(good);
    }
    for (const purchase of purchases) {
      await purchaseFactory.save(purchase);
    }
    for (const locker of lockers) {
      await lockerFactory.save(locker);
    }
  }
}
