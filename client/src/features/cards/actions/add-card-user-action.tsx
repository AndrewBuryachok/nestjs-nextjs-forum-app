import { LuUserPlus } from 'react-icons/lu';
import { Card } from '../types';
import AddCardUserForm from '../forms/add-card-user-form';
import { Color } from '@/constants/colors';

export const addCardUserFactory = (card: Card, isAll: boolean) => ({
  action: 'add',
  dialog: 'user',
  color: Color.GREEN,
  userId: isAll ? 0 : card.account.user.id,
  icon: <LuUserPlus />,
  body: <AddCardUserForm card={card} isAll={isAll} />,
});

export const addMyCardUserAction = (card: Card) =>
  addCardUserFactory(card, false);

export const addUserCardUserAction = (card: Card) =>
  addCardUserFactory(card, true);
