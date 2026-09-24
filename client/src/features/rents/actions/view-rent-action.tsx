import { LuEye } from 'react-icons/lu';
import { Rent } from '../types';
import ViewRentForm from '../forms/view-rent-form';
import { Color } from '@/constants/colors';

export const viewRentAction = (rent: Rent) => ({
  action: 'view',
  dialog: 'rent',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewRentForm rent={rent} />,
});
