import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../features/products/product.entity';
import { Item, Unit } from '../../common/enums';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.item = faker.helpers.enumValue(Item);
  product.description = faker.datatype.boolean() ? faker.lorem.words(2) : '';
  product.amount = faker.number.int({ min: 1, max: 64 });
  product.unit = faker.helpers.enumValue(Unit);
  product.price = faker.number.int({ min: 1, max: 1000 });
  return product;
});
