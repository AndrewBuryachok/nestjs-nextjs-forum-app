import { User } from '../../users/types';
import { viewUserAction } from '../../users/actions/view-user-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  user: User;
};

export default function SentInvitationsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewUserAction].map((action) => action(props.user))}
    />
  );
}
