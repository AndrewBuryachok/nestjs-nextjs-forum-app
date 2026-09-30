import { Town } from '../types';
import ViewTownUsersForm from '../forms/view-town-users-form';

export const viewTownUsersAction = (town: Town) => ({
  action: 'view',
  dialog: 'residents',
  icon: town.users,
  body: <ViewTownUsersForm town={town} />,
});
