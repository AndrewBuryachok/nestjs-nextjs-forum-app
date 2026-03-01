import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import { viewUserAction } from '../actions/view-user-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
  user: User;
};

export default function UsersActions(props: Props) {
  return (
    <CustomActions
      actions={[viewUserAction].map((action) => action(props.user))}
    />
  );
}
