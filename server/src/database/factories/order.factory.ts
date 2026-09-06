import { setSeederFactory } from 'typeorm-extension';
import { Order } from '../../features/orders/order.entity';
import { Item, Status, Unit } from '../../common/enums';

export default setSeederFactory(Order, (faker) => {
  const order = new Order();
  order.item = faker.helpers.enumValue(Item);
  order.description = faker.datatype.boolean() ? 'тестовое описание' : '';
  order.amount = faker.number.int({ min: 1, max: 64 });
  order.unit = faker.helpers.enumValue(Unit);
  order.status = faker.helpers.enumValue(Status);
  return order;
});
