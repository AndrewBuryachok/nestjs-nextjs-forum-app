import { LuUsers } from 'react-icons/lu';
import { Town } from '../types';
import ViewTownResidentsForm from '../forms/view-town-residents-form';

export const viewTownResidentsAction = (town: Town) => ({
  button: true,
  number: town.users,
  action: 'view',
  dialog: 'residents',
  icon: <LuUsers />,
  body: <ViewTownResidentsForm town={town} />,
});
