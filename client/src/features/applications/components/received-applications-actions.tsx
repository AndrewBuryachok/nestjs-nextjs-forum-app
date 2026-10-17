import { User } from '../../users/types';
import { viewUserAction } from '../../users/actions/view-user-action';
import { acceptApplicationAction } from '../actions/accept-application-action';
import { rejectApplicationAction } from '../actions/reject-application-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  user: User;
};

export default function ReceivedApplicationsActions(props: Props) {
  return (
    <CustomActions
      actions={[
        viewUserAction,
        acceptApplicationAction,
        rejectApplicationAction,
      ].map((action) => action(props.user))}
    />
  );
}
