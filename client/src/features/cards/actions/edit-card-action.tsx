import { LuPencil } from 'react-icons/lu';
import { Card } from '../types';
import EditCardForm from '../forms/edit-card-form';
import { Color } from '@/constants/colors';

export const editCardFactory = (card: Card, isAll: boolean) => ({
  action: 'edit',
  dialog: 'card',
  color: Color.YELLOW,
  userId: isAll ? 0 : card.account.user.id,
  icon: <LuPencil />,
  body: <EditCardForm card={card} isAll={isAll} />,
});

export const editMyCardAction = (card: Card) => editCardFactory(card, false);

export const editUserCardAction = (card: Card) => editCardFactory(card, true);
