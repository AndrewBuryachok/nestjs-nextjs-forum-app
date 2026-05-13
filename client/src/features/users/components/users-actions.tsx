import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import { viewUserAction } from '../actions/view-user-action';
import { addUserRoleAction } from '../actions/add-user-role-action';
import { removeUserRoleAction } from '../actions/remove-user-role-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
  user: User;
};

export default function UsersActions(props: Props) {
  const actions = {
    main: [],
    all: [addUserRoleAction, removeUserRoleAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewUserAction, ...actions].map((action) => action(props.user))}
    />
  );
}
