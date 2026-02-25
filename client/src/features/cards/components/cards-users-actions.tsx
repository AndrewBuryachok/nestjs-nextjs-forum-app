import { Card } from '../types';
import { viewCardUsersAction } from '../actions/view-card-users-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  card: Card;
};

export default function CardsUsersActions(props: Props) {
  return (
    <CustomActions
      actions={[viewCardUsersAction].map((action) => action(props.card))}
    />
  );
}
