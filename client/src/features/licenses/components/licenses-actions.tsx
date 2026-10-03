import { User } from '@/features/users/types';
import { viewUserAction } from '../../users/actions/view-user-action';
import { deleteLicenseAction } from '../actions/delete-license-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  user: User;
};

export default function UsersActions(props: Props) {
  return (
    <CustomActions
      actions={[viewUserAction, deleteLicenseAction].map((action) =>
        action(props.user),
      )}
    />
  );
}
