import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownResidentsAction } from '../actions/view-town-residents-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsResidentsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTownResidentsAction].map((action) => action(props.town))}
    />
  );
}
