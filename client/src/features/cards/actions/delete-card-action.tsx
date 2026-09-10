import { LuTrash2 } from 'react-icons/lu';
import { Card } from '../types';
import DeleteCardForm from '../forms/delete-card-form';
import { Color } from '@/constants/colors';

export const deleteCardFactory = (card: Card, isAll: boolean) => ({
  action: 'delete',
  dialog: 'card',
  color: Color.RED,
  disabled: !!card.balance || card.users > 1,
  userId: isAll ? 0 : card.user.id,
  icon: <LuTrash2 />,
  body: <DeleteCardForm card={card} isAll={isAll} />,
});

export const deleteMyCardAction = (card: Card) =>
  deleteCardFactory(card, false);

export const deleteUserCardAction = (card: Card) =>
  deleteCardFactory(card, true);
