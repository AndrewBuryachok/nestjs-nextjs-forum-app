import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import { viewCardAction } from '../actions/view-card-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
  card: Card;
};

export default function CardsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewCardAction].map((action) => action(props.card))}
    />
  );
}
