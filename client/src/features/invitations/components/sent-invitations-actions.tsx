import { User } from '../../users/types';
import { viewUserAction } from '../../users/actions/view-user-action';
import { deleteInvitationAction } from '../actions/delete-invitation-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  user: User;
};

export default function SentInvitationsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewUserAction, deleteInvitationAction].map((action) =>
        action(props.user),
      )}
    />
  );
}
