import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import { viewCardUsersAction } from '../actions/view-card-users-action';
import {
  addMyCardUserAction,
  addUserCardUserAction,
} from '../actions/add-card-user-action';
import {
  removeMyCardUserAction,
  removeUserCardUserAction,
} from '../actions/remove-card-user-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
  card: Card;
};

export default function CardsUsersActions(props: Props) {
  const actions = {
    my: [addMyCardUserAction, removeMyCardUserAction],
    all: [addUserCardUserAction, removeUserCardUserAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[actions[0], viewCardUsersAction, actions[1]].map((action) =>
        action(props.card),
      )}
    />
  );
}
