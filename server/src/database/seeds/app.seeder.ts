import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { User } from '../../features/users/user.entity';
import { Card } from '../../features/cards/card.entity';
import { CardUser } from '../../features/cards/card-user.entity';
import { Transaction } from '../../features/transactions/transaction.entity';
import { Fine } from '../../features/fines/fine.entity';
import { Market } from '../../features/markets/market.entity';
import { Plot } from '../../features/plots/plot.entity';
import { Rent } from '../../features/rents/rent.entity';
import { Shop } from '../../features/shops/shop.entity';
import { Product } from '../../features/products/product.entity';
import { Purchase } from '../../features/purchases/purchase.entity';
import { Locker } from '../../features/lockers/locker.entity';
import { Order } from '../../features/orders/order.entity';
import { Status, TransactionType } from '../../common/enums';

export default class AppSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    const userFactory = factoryManager.get(User);
    const users: User[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const user = await userFactory.make({ id });
      users.push(user);
    }
    const cardFactory = factoryManager.get(Card);
    const cards: Card[] = [];
    for (let i = 0; i < 40; i++) {
      const id = i + 1;
      const user = faker.helpers.arrayElement(users);
      const card = await cardFactory.make({ id, user });
      cards.push(card);
    }
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
          type: TransactionType.DEPOSIT,
          sum,
          description: '',
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
          type: TransactionType.WITHDRAW,
          sum,
          description: '',
        });
        transactions.push(transaction);
      }
    }
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
        type: TransactionType.TRANSFER,
        sum,
        description: 'тестовое описание',
      });
      transfers.push(transfer);
    }
    transactions.push(...transfers);
    const fineFactory = factoryManager.get(Fine);
    const fines: Fine[] = [];
    for (let i = 0; i < 40; i++) {
      const sum = faker.number.int({ min: 1, max: 1000 });
      const senderCard = faker.helpers.arrayElement(cards);
      const receiverCard = faker.helpers.arrayElement(
        cards.filter((card) => card.balance >= sum),
      );
      const senderUser = randomUserOf(senderCard);
      const receiverUser = randomUserOf(receiverCard);
      const fine = await fineFactory.make({
        senderUser,
        senderCard,
        receiverUser,
        sum,
      });
      if (faker.datatype.boolean()) {
        fine.receiverCard = receiverCard;
        fine.paidAt = new Date();
        receiverCard.balance -= sum;
        senderCard.balance += sum;
        const transfer = await transactionFactory.make({
          senderUser: receiverUser,
          senderCard: receiverCard,
          receiverUser: senderUser,
          receiverCard: senderCard,
          type: TransactionType.PAY_FINE,
          sum,
          description: fine.description,
        });
        transactions.push(transfer);
      }
      fines.push(fine);
    }
    const marketFactory = factoryManager.get(Market);
    const markets: Market[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const card = faker.helpers.arrayElement(cards);
      const user = randomUserOf(card);
      const market = await marketFactory.make({ id, user, card });
      markets.push(market);
    }
    const plotFactory = factoryManager.get(Plot);
    const plots: Plot[] = [];
    for (let i = 0; i < 40; i++) {
      const id = i + 1;
      const market = faker.helpers.arrayElement(markets);
      const plot = await plotFactory.make({ id, market });
      plots.push(plot);
    }
    const rentFactory = factoryManager.get(Rent);
    const rents: Rent[] = [];
    for (let i = 0; i < 20; i++) {
      const plot = faker.helpers.arrayElement(
        plots.filter(
          (plot) => !plot.reservedUntil || plot.reservedUntil < new Date(),
        ),
      );
      const card = faker.helpers.arrayElement(
        cards.filter((card) => card.balance >= plot.price),
      );
      const user = randomUserOf(card);
      card.balance -= plot.price;
      plot.market.card.balance += plot.price;
      const transfer = await transactionFactory.make({
        senderUser: user,
        senderCard: card,
        receiverUser: plot.market.user,
        receiverCard: plot.market.card,
        type: TransactionType.RENT_PLOT,
        sum: plot.price,
        description: plot.name,
      });
      transactions.push(transfer);
      plot.reservedUntil = new Date();
      plot.reservedUntil.setDate(plot.reservedUntil.getDate() + 7);
      const rent = await rentFactory.make({ plot, user, card });
      rents.push(rent);
    }
    const shopFactory = factoryManager.get(Shop);
    const shops: Shop[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const card = faker.helpers.arrayElement(cards);
      const user = randomUserOf(card);
      const shop = await shopFactory.make({ id, user, card });
      shops.push(shop);
    }
    const productFactory = factoryManager.get(Product);
    const products: Product[] = [];
    for (let i = 0; i < 40; i++) {
      const id = i + 1;
      const shop = faker.helpers.arrayElement(shops);
      const user = randomUserOf(shop.card);
      const product = await productFactory.make({ id, shop, user });
      products.push(product);
    }
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
        type: TransactionType.BUY_PRODUCT,
        sum: amount * product.price,
        description: product.description,
        item: product.item,
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
    const lockerFactory = factoryManager.get(Locker);
    const lockers: Locker[] = [];
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const user = faker.helpers.arrayElement(users);
      const locker = await lockerFactory.make({ id, user });
      lockers.push(locker);
    }
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
        type: TransactionType.CREATE_ORDER,
        sum,
        description: order.description,
        item: order.item,
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
          type: TransactionType.COMPLETE_ORDER,
          sum,
          description: order.description,
          item: order.item,
        });
        transactions.push(transaction);
        executorCard.balance += sum;
        const transfer = await transactionFactory.make({
          senderUser: customerUser,
          senderCard: customerCard,
          receiverUser: executorUser,
          receiverCard: executorCard,
          type: TransactionType.EXECUTE_ORDER,
          sum,
          description: order.description,
          item: order.item,
        });
        transactions.push(transfer);
      }
      orders.push(order);
    }
    await dataSource.getRepository(User).save(users);
    await dataSource.getRepository(Card).save(cards);
    await dataSource.getRepository(CardUser).save(cardsUsers);
    await dataSource.getRepository(Transaction).save(transactions);
    await dataSource.getRepository(Fine).save(fines);
    await dataSource.getRepository(Market).save(markets);
    await dataSource.getRepository(Plot).save(plots);
    await dataSource.getRepository(Rent).save(rents);
    await dataSource.getRepository(Shop).save(shops);
    await dataSource.getRepository(Product).save(products);
    await dataSource.getRepository(Purchase).save(purchases);
    await dataSource.getRepository(Locker).save(lockers);
    await dataSource.getRepository(Order).save(orders);
  }
}
