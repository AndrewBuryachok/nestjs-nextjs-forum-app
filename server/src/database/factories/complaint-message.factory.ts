import { setSeederFactory } from 'typeorm-extension';
import { ComplaintMessage } from '../../features/complaints/complaint-message.entity';

export default setSeederFactory(ComplaintMessage, (faker) => {
  const message = new ComplaintMessage();
  message.image = faker.image.url();
  message.text = faker.lorem.text();
  return message;
});
