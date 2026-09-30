import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownUsersAction } from '../actions/view-town-users-action';
import {
  addMyTownUserAction,
  addUserTownUserAction,
} from '../actions/add-town-user-action';
import {
  removeMyTownUserAction,
  removeUserTownUserAction,
} from '../actions/remove-town-user-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsUsersActions(props: Props) {
  const actions = {
    main: [viewTownUsersAction],
    my: [addMyTownUserAction, viewTownUsersAction, removeMyTownUserAction],
    all: [addUserTownUserAction, viewTownUsersAction, removeUserTownUserAction],
  }[props.tab];

  return (
    <CustomActions actions={actions.map((action) => action(props.town))} />
  );
}
