import { Town } from '../../towns/types';
import { viewTownAction } from '../../towns/actions/view-town-action';
import { acceptInvitationAction } from '../actions/accept-invitation-action';
import { rejectInvitationAction } from '../actions/reject-invitation-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  town: Town;
};

export default function ReceivedInvitationsActions(props: Props) {
  return (
    <CustomActions
      actions={[
        viewTownAction,
        acceptInvitationAction,
        rejectInvitationAction,
      ].map((action) => action(props.town))}
    />
  );
}
