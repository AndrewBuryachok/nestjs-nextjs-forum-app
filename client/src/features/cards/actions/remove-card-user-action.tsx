import { LuUserMinus } from 'react-icons/lu';
import { Card } from '../types';
import RemoveCardUserForm from '../forms/remove-card-user-form';
import { Color } from '@/constants/colors';

export const removeCardUserFactory = (card: Card, isAll: boolean) => ({
  action: 'remove',
  dialog: 'user',
  color: Color.RED,
  disabled: card.account.users === 1,
  userId: isAll ? 0 : card.account.user.id,
  icon: <LuUserMinus />,
  body: <RemoveCardUserForm card={card} isAll={isAll} />,
});

export const removeMyCardUserAction = (card: Card) =>
  removeCardUserFactory(card, false);

export const removeUserCardUserAction = (card: Card) =>
  removeCardUserFactory(card, true);
