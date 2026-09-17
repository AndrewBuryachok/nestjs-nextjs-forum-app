import { PAGE_TABS_MAP } from '@/config/navigation';
import { Landmark } from '../types';
import { viewLandmarkAction } from '../actions/view-landmark-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
  landmark: Landmark;
};

export default function LandmarksActions(props: Props) {
  return (
    <CustomActions
      actions={[viewLandmarkAction].map((action) => action(props.landmark))}
    />
  );
}
