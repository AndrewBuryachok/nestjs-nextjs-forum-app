import { LuEye } from 'react-icons/lu';
import { Card } from '../types';
import ViewCardForm from '../forms/view-card-form';
import { Color } from '@/constants/colors';

export const viewCardAction = (card: Card) => ({
  action: 'view',
  dialog: 'card',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewCardForm card={card} />,
});
