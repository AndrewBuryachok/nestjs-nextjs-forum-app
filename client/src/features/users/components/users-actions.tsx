import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import { viewUserAction } from '../actions/view-user-action';
import { editUserProfileAction } from '../actions/edit-user-profile-action';
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
    all: [editUserProfileAction, addUserRoleAction, removeUserRoleAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewUserAction, ...actions].map((action) => action(props.user))}
    />
  );
}
