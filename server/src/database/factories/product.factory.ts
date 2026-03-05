import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../features/products/product.entity';
import { Item, Unit } from '../../common/enums';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.item = faker.helpers.enumValue(Item);
  product.description = faker.datatype.boolean() ? faker.lorem.words(2) : '';
  product.amount = faker.number.int({ min: 1, max: 27 });
  const batch = faker.helpers.arrayElement([1, 2, 4, 8, 16, 32, 64]);
  const unit = faker.helpers.enumValue(Unit);
  product.batch = unit === Unit.PIECE ? batch : 1;
  product.unit = unit;
  product.price = faker.number.int({ min: 1, max: 1000 });
  return product;
});
