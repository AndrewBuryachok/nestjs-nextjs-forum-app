import { Town } from '../types';
import ViewTownResidentsForm from '../forms/view-town-residents-form';

export const viewTownResidentsAction = (town: Town) => ({
  action: 'view',
  dialog: 'residents',
  icon: `${town.users}/${process.env.NEXT_PUBLIC_MIN_TOWN_USERS!.split(',')[town.level - 1]}`,
  body: <ViewTownResidentsForm town={town} />,
});
