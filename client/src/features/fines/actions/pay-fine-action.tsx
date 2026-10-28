import { LuPlus } from 'react-icons/lu';
import { Fine } from '../types';
import PayFineForm from '../forms/pay-fine-form';
import { Color } from '@/constants/colors';

export const payFineAction = (fine: Fine) => ({
  action: 'pay',
  dialog: 'fine',
  color: Color.GREEN,
  disabled: !!fine.paidAt,
  userId: fine.receiverUser.id,
  icon: <LuPlus />,
  body: <PayFineForm fine={fine} />,
});
