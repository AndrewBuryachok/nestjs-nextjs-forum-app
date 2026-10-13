import { Town } from '../types';
import ViewTownResidentsForm from '../forms/view-town-residents-form';

export const viewTownResidentsAction = (town: Town) => ({
  action: 'view',
  dialog: 'residents',
  icon: town.users,
  body: <ViewTownResidentsForm town={town} />,
});
