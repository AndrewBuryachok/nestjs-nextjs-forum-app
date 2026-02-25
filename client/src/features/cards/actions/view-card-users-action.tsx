import { Card } from '../types';
import ViewCardUsersForm from '../forms/view-card-users-form';

export const viewCardUsersAction = (card: Card) => ({
  action: 'view',
  dialog: 'users',
  icon: card.account.users,
  body: <ViewCardUsersForm card={card} />,
});
