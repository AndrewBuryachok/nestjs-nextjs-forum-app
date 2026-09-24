import { LuPlus } from 'react-icons/lu';
import { Rent } from '../types';
import ContinueRentForm from '../forms/continue-rent-form';
import { Color } from '@/constants/colors';

export const continueRentFactory = (rent: Rent, isAll: boolean) => ({
  action: 'continue',
  dialog: 'rent',
  color: Color.GREEN,
  disabled: rent.completedAt > new Date(),
  userId: isAll ? 0 : rent.user.id,
  icon: <LuPlus />,
  body: <ContinueRentForm rent={rent} isAll={isAll} />,
});

export const continueMyRentAction = (rent: Rent) =>
  continueRentFactory(rent, false);

export const continueUserRentAction = (rent: Rent) =>
  continueRentFactory(rent, true);
