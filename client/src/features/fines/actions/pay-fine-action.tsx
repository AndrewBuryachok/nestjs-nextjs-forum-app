import { LuBanknote } from 'react-icons/lu';
import { Fine } from '../types';
import PayFineForm from '../forms/pay-fine-form';
import { Color } from '@/constants/colors';

export const payFineAction = (fine: Fine) => ({
  button: true,
  action: 'pay',
  dialog: 'fine',
  color: Color.GREEN,
  disabled: !!fine.paidAt,
  userId: fine.receiverUser.id,
  icon: <LuBanknote />,
  body: <PayFineForm fine={fine} />,
});
