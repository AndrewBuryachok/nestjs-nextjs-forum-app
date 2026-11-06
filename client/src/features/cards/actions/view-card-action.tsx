import { LuEye } from 'react-icons/lu';
import { Card } from '../types';
import ViewCardForm from '../forms/view-card-form';

export const viewCardAction = (card: Card) => ({
  action: 'view',
  dialog: 'card',
  icon: <LuEye />,
  body: <ViewCardForm card={card} />,
});
