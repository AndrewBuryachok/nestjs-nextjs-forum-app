import { LuEye } from 'react-icons/lu';
import { Rent } from '../types';
import ViewRentForm from '../forms/view-rent-form';

export const viewRentAction = (rent: Rent) => ({
  action: 'view',
  dialog: 'rent',
  icon: <LuEye />,
  body: <ViewRentForm rent={rent} />,
});
