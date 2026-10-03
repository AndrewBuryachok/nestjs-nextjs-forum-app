import { setSeederFactory } from 'typeorm-extension';
import { Complaint } from '../../features/complaints/complaint.entity';

export default setSeederFactory(Complaint, (faker) => {
  const complaint = new Complaint();
  complaint.title = faker.lorem.words(2);
  return complaint;
});
