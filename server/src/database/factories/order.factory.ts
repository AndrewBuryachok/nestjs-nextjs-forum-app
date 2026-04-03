import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Order } from '../../features/orders/order.entity';
import { Item, Status, Unit } from '../../common/enums';

export const OrderFactory = setSeederFactory(Order, (faker: Faker) => {
  const order = new Order();
  order.item = faker.helpers.enumValue(Item);
  order.description = faker.datatype.boolean() ? '' : faker.lorem.words(2);
  order.amount = faker.number.int({ min: 1, max: 27 });
  const batch = faker.helpers.arrayElement([1, 2, 4, 8, 16, 32, 64]);
  const unit = faker.helpers.enumValue(Unit);
  order.batch = unit === Unit.PIECE ? batch : 1;
  order.unit = unit;
  order.status = faker.helpers.enumValue(Status);
  return order;
});
