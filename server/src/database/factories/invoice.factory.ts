import { setSeederFactory } from 'typeorm-extension';
import { Invoice } from '../../features/invoices/invoice.entity';

export default setSeederFactory(Invoice, (faker) => {
  const invoice = new Invoice();
  invoice.description = faker.lorem.words(2);
  return invoice;
});
