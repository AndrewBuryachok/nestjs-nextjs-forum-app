import { LuTrash2 } from 'react-icons/lu';
import { Card } from '../types';
import DeleteCardForm from '../forms/delete-card-form';
import { Color } from '@/constants/colors';

export const deleteCardFactory = (card: Card, isAll: boolean) => ({
  action: 'delete',
  dialog: 'card',
  color: Color.RED,
  userId: isAll ? 0 : card.account.user.id,
  icon: <LuTrash2 />,
  body: <DeleteCardForm card={card} isAll={isAll} />,
});

export const deleteMyCardAction = (card: Card) =>
  deleteCardFactory(card, false);

export const deleteUserCardAction = (card: Card) =>
  deleteCardFactory(card, true);
