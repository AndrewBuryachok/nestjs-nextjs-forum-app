import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import { viewCardAction } from '../actions/view-card-action';
import { viewCardUsersAction } from '../actions/view-card-users-action';
import {
  addMyCardUserAction,
  addUserCardUserAction,
} from '../actions/add-card-user-action';
import {
  removeMyCardUserAction,
  removeUserCardUserAction,
} from '../actions/remove-card-user-action';
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
    my: [
      addMyCardUserAction,
      removeMyCardUserAction,
      editMyCardAction,
      deleteMyCardAction,
    ],
    all: [
      addUserCardUserAction,
      removeUserCardUserAction,
      editUserCardAction,
      deleteUserCardAction,
    ],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewCardAction, viewCardUsersAction, ...actions].map((action) =>
        action(props.card),
      )}
    />
  );
}
