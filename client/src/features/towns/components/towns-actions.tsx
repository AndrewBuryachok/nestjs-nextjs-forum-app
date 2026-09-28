import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownAction } from '../actions/view-town-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTownAction].map((action) => action(props.town))}
    />
  );
}
