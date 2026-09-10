import { LuPlus } from 'react-icons/lu';
import { Fine } from '../types';
import PayFineForm from '../forms/pay-fine-form';
import { Color } from '@/constants/colors';

export const payFineFactory = (fine: Fine, isAll: boolean) => ({
  action: 'pay',
  dialog: 'fine',
  color: Color.GREEN,
  disabled: !!fine.paidAt,
  userId: isAll ? 0 : fine.receiverUser.id,
  icon: <LuPlus />,
  body: <PayFineForm fine={fine} isAll={isAll} />,
});

export const payMyFineAction = (fine: Fine) => payFineFactory(fine, false);

export const payUserFineAction = (fine: Fine) => payFineFactory(fine, true);
