import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownChunksAction } from '../actions/view-town-chunks-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsChunksActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTownChunksAction].map((action) => action(props.town))}
    />
  );
}
