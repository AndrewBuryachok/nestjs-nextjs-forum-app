import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownUsersAction } from '../actions/view-town-users-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsUsersActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTownUsersAction].map((action) => action(props.town))}
    />
  );
}
