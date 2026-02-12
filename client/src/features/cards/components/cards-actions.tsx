import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import { viewCardAction } from '../actions/view-card-action';
import {
  editMyCardAction,
  editUserCardAction,
} from '../actions/edit-card-action';
import {
  deleteMyCardAction,
  deleteUserCardAction,
} from '../actions/delete-card-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
  card: Card;
};

export default function CardsActions(props: Props) {
  const actions = {
    my: [editMyCardAction, deleteMyCardAction],
    all: [editUserCardAction, deleteUserCardAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewCardAction, ...actions].map((action) => action(props.card))}
    />
  );
}
