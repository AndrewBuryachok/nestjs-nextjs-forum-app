import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Good } from '../../features/goods/good.entity';
import { Item, Unit } from '../../common/enums';

export const GoodFactory = setSeederFactory(Good, (faker: Faker) => {
  const good = new Good();
  good.item = faker.helpers.enumValue(Item);
  good.description = faker.datatype.boolean() ? '' : faker.lorem.words(2);
  good.amount = faker.number.int({ min: 1, max: 27 });
  const batch = faker.helpers.arrayElement([1, 2, 4, 8, 16, 32, 64]);
  const unit = faker.helpers.enumValue(Unit);
  good.batch = unit === Unit.PIECE ? batch : 1;
  good.unit = unit;
  good.price = faker.number.int({ min: 1, max: 1000 });
  return good;
});
