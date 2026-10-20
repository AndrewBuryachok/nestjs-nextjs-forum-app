import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../../users/types';
import { viewUserAction } from '../../users/actions/view-user-action';
import { deleteResidentAction } from '../actions/delete-resident-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.residents;
  user: User;
};

export default function ResidentsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewUserAction, deleteResidentAction].map((action) =>
        action(props.user),
      )}
    />
  );
}
