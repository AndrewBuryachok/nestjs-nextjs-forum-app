import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { User } from '../../features/users/user.entity';
import { Card } from '../../features/cards/card.entity';
import { CardUser } from '../../features/cards/card-user.entity';
import { Transaction } from '../../features/transactions/transaction.entity';
import { Shop } from '../../features/shops/shop.entity';
import { Product } from '../../features/products/product.entity';
import { Purchase } from '../../features/purchases/purchase.entity';
import { Locker } from '../../features/lockers/locker.entity';
import { Order } from '../../features/orders/order.entity';
import { Status } from '../../common/enums';

export default class AppSeeder implements Seeder {
  private logger = new Logger(AppSeeder.name);

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    const startTime = Date.now();
    this.logger.log('🚀 Starting Seeding Process...');
    this.logger.log('Generating Users...');
    const userFactory = factoryManager.get(User);
    const users: User[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const user = await userFactory.make({ id });
      users.push(user);
    }
    this.logger.log(`Generated ${users.length} Users`);
    this.logger.log('Generating Cards...');
    const cardFactory = factoryManager.get(Card);
    const cards: Card[] = [];
    for (let i = 0; i < 40; i++) {
      const id = i + 1;
      const user = faker.helpers.arrayElement(users);
      const card = await cardFactory.make({ id, user });
      cards.push(card);
    }
    this.logger.log(`Generated ${cards.length} Cards`);
    this.logger.log('Generating CardsUsers...');
    const cardUserFactory = factoryManager.get(CardUser);
    const cardsUsers: CardUser[] = [];
    for (const card of cards) {
      const cardUsers = faker.helpers.arrayElements(
        users.filter((user) => user.id !== card.user.id),
        { min: 0, max: 4 },
      );
      for (const user of [card.user, ...cardUsers]) {
        const cardUser = await cardUserFactory.make({ card, user });
        cardsUsers.push(cardUser);
      }
    }
    this.logger.log(`Generated ${cardsUsers.length} CardsUsers`);
    this.logger.log('Generating Transactions...');
    const randomUserOf = (card: Card) =>
      faker.helpers.arrayElement(
        cardsUsers.filter((cardUser) => cardUser.card.id === card.id),
      ).user;
    const transactionFactory = factoryManager.get(Transaction);
    const transactions: Transaction[] = [];
    for (let i = 0; i < 80; i++) {
      const executorUser = faker.helpers.arrayElement(users);
      const sum = faker.number.int({ min: 1, max: 1000 });
      if (faker.datatype.boolean(0.9)) {
        const receiverCard = faker.helpers.arrayElement(cards);
        const receiverUser = randomUserOf(receiverCard);
        receiverCard.balance += sum;
        const transaction = await transactionFactory.make({
          executorUser,
          receiverUser,
          receiverCard,
          sum,
          description: 'deposit',
        });
        transactions.push(transaction);
      } else {
        const senderCard = faker.helpers.arrayElement(
          cards.filter((card) => card.balance >= sum),
        );
        const senderUser = randomUserOf(senderCard);
        senderCard.balance -= sum;
        const transaction = await transactionFactory.make({
          executorUser,
          senderUser,
          senderCard,
          sum,
          description: 'withdraw',
        });
        transactions.push(transaction);
      }
    }
    this.logger.log(`Generated ${transactions.length} Transactions`);
    this.logger.log('Generating Transfers...');
    const transfers: Transaction[] = [];
    for (let i = 0; i < 40; i++) {
      const sum = faker.number.int({ min: 1, max: 1000 });
      const senderCard = faker.helpers.arrayElement(
        cards.filter((card) => card.balance >= sum),
      );
      const receiverCard = faker.helpers.arrayElement(cards);
      const senderUser = randomUserOf(senderCard);
      const receiverUser = randomUserOf(receiverCard);
      senderCard.balance -= sum;
      receiverCard.balance += sum;
      const transfer = await transactionFactory.make({
        senderUser,
        senderCard,
        receiverUser,
        receiverCard,
        sum,
        description: faker.lorem.words(2),
      });
      transfers.push(transfer);
    }
    transactions.push(...transfers);
    this.logger.log(`Generated ${transfers.length} Transfers`);
    this.logger.log('Generating Shops...');
    const shopFactory = factoryManager.get(Shop);
    const shops: Shop[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const card = faker.helpers.arrayElement(cards);
      const user = randomUserOf(card);
      const shop = await shopFactory.make({ id, user, card });
      shops.push(shop);
    }
    this.logger.log(`Generated ${shops.length} Shops`);
    this.logger.log('Generating Products...');
    const productFactory = factoryManager.get(Product);
    const products: Product[] = [];
    for (let i = 0; i < 40; i++) {
      const id = i + 1;
      const shop = faker.helpers.arrayElement(shops);
      const user = randomUserOf(shop.card);
      const product = await productFactory.make({ id, shop, user });
      products.push(product);
    }
    this.logger.log(`Generated ${products.length} Products`);
    this.logger.log('Generating Purchases...');
    const purchaseFactory = factoryManager.get(Purchase);
    const purchases: Purchase[] = [];
    for (let i = 0; i < 40; i++) {
      const product = faker.helpers.arrayElement(
        products.filter((product) => product.amount > 0),
      );
      const card = faker.helpers.arrayElement(
        cards.filter((card) => card.balance >= product.price),
      );
      const user = randomUserOf(card);
      const max = Math.min(
        product.amount,
        Math.floor(card.balance / product.price),
      );
      const amount = faker.number.int({ min: 1, max });
      card.balance -= amount * product.price;
      product.shop.card.balance += amount * product.price;
      const transfer = await transactionFactory.make({
        senderUser: user,
        senderCard: card,
        receiverUser: product.user,
        receiverCard: product.shop.card,
        sum: amount * product.price,
        description: 'купівля товару',
      });
      transactions.push(transfer);
      product.amount -= amount;
      const purchase = await purchaseFactory.make({
        product,
        user,
        card,
        amount,
        price: product.price,
      });
      purchases.push(purchase);
    }
    this.logger.log(`Generated ${purchases.length} Purchases`);
    this.logger.log('Generating Lockers...');
    const lockerFactory = factoryManager.get(Locker);
    const lockers: Locker[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const user = faker.helpers.arrayElement(users);
      const locker = await lockerFactory.make({ id, user });
      lockers.push(locker);
    }
    this.logger.log(`Generated ${lockers.length} Lockers`);
    this.logger.log('Generating Orders...');
    const orderFactory = factoryManager.get(Order);
    const orders: Order[] = [];
    for (let i = 0; i < 40; i++) {
      const locker = faker.helpers.arrayElement(lockers);
      const sum = faker.number.int({ min: 1, max: 1000 });
      const customerCard = faker.helpers.arrayElement(
        cards.filter((card) => card.balance >= sum),
      );
      const executorCard = faker.helpers.arrayElement(cards);
      const customerUser = randomUserOf(customerCard);
      const executorUser = randomUserOf(executorCard);
      const order = await orderFactory.make({
        locker,
        customerUser,
        customerCard,
        sum,
      });
      customerCard.balance -= sum;
      const transaction = await transactionFactory.make({
        senderUser: customerUser,
        senderCard: customerCard,
        sum,
        description: 'створення замовлення',
      });
      transactions.push(transaction);
      if (order.status !== Status.CREATED) {
        order.executorUser = executorUser;
        order.executorCard = executorCard;
      }
      if (order.status === Status.COMPLETED) {
        order.completedAt = new Date();
        const transaction = await transactionFactory.make({
          receiverUser: customerUser,
          receiverCard: customerCard,
          sum,
          description: 'завершення замовлення',
        });
        transactions.push(transaction);
        executorCard.balance += sum;
        const transfer = await transactionFactory.make({
          senderUser: customerUser,
          senderCard: customerCard,
          receiverUser: executorUser,
          receiverCard: executorCard,
          sum,
          description: 'виконання замовлення',
        });
        transactions.push(transfer);
      }
      orders.push(order);
    }
    this.logger.log(`Generated ${orders.length} Orders`);
    this.logger.log('💾 Saving generated entities to DB...');
    this.logger.log('Saving Users...');
    await dataSource.getRepository(User).save(users);
    this.logger.log(`Saved ${users.length} Users`);
    this.logger.log('Saving Cards...');
    await dataSource.getRepository(Card).save(cards);
    this.logger.log(`Saved ${cards.length} Cards`);
    this.logger.log('Saving CardsUsers...');
    await dataSource.getRepository(CardUser).save(cardsUsers);
    this.logger.log(`Saved ${cardsUsers.length} CardsUsers`);
    this.logger.log('Saving Transactions...');
    await dataSource.getRepository(Transaction).save(transactions);
    this.logger.log(`Saved ${transactions.length} Transactions`);
    this.logger.log('Saving Shops...');
    await dataSource.getRepository(Shop).save(shops);
    this.logger.log(`Saved ${shops.length} Shops`);
    this.logger.log('Saving Products...');
    await dataSource.getRepository(Product).save(products);
    this.logger.log(`Saved ${products.length} Products`);
    this.logger.log('Saving Purchases...');
    await dataSource.getRepository(Purchase).save(purchases);
    this.logger.log(`Saved ${purchases.length} Purchases`);
    this.logger.log('Saving Lockers...');
    await dataSource.getRepository(Locker).save(lockers);
    this.logger.log(`Saved ${lockers.length} Lockers`);
    this.logger.log('Saving Orders...');
    await dataSource.getRepository(Order).save(orders);
    this.logger.log(`Saved ${orders.length} Orders`);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    this.logger.log(
      `✅ Seeding process completed successfully in ${duration}s`,
    );
  }
}
