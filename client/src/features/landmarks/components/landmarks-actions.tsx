import { PAGE_TABS_MAP } from '@/config/navigation';
import { Landmark } from '../types';
import { viewLandmarkAction } from '../actions/view-landmark-action';
import {
  editMyLandmarkAction,
  editUserLandmarkAction,
} from '../actions/edit-landmark-action';
import {
  deleteMyLandmarkAction,
  deleteUserLandmarkAction,
} from '../actions/delete-landmark-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
  landmark: Landmark;
};

export default function LandmarksActions(props: Props) {
  const actions = {
    main: [],
    my: [editMyLandmarkAction, deleteMyLandmarkAction],
    all: [editUserLandmarkAction, deleteUserLandmarkAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewLandmarkAction, ...actions].map((action) =>
        action(props.landmark),
      )}
    />
  );
}
