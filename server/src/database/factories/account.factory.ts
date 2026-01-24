import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Account } from '../../features/cards/account.entity';

export const AccountFactory = setSeederFactory(Account, (faker: Faker) => {
  const account = new Account();
  const name = faker.finance.accountName();
  account.name = name.slice(0, name.lastIndexOf(' '));
  account.balance = 0;
  return account;
});
