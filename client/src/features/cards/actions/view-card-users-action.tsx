import { LuUsers } from 'react-icons/lu';
import { Card } from '../types';
import ViewCardUsersForm from '../forms/view-card-users-form';

export const viewCardUsersAction = (card: Card) => ({
  button: true,
  number: card.users,
  action: 'view',
  dialog: 'users',
  icon: <LuUsers />,
  body: <ViewCardUsersForm card={card} />,
});
