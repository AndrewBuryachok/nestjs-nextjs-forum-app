import { LuMinus } from 'react-icons/lu';
import { Rent } from '../types';
import CompleteRentForm from '../forms/complete-rent-form';
import { Color } from '@/constants/colors';

export const completeRentFactory = (rent: Rent, isAll: boolean) => ({
  action: 'complete',
  dialog: 'rent',
  color: Color.RED,
  disabled: rent.completedAt > new Date(),
  userId: isAll ? 0 : rent.user.id,
  icon: <LuMinus />,
  body: <CompleteRentForm rent={rent} isAll={isAll} />,
});

export const completeMyRentAction = (rent: Rent) =>
  completeRentFactory(rent, false);

export const completeUserRentAction = (rent: Rent) =>
  completeRentFactory(rent, true);
