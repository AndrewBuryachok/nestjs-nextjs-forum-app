import { PAGE_TABS_MAP } from '@/config/navigation';
import { Locker } from '../types';
import { viewLockerAction } from '../actions/view-locker-action';
import {
  editMyLockerAction,
  editUserLockerAction,
} from '../actions/edit-locker-action';
import {
  deleteMyLockerAction,
  deleteUserLockerAction,
} from '../actions/delete-locker-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
  locker: Locker;
};

export default function LockersActions(props: Props) {
  const actions = {
    main: [],
    my: [editMyLockerAction, deleteMyLockerAction],
    all: [editUserLockerAction, deleteUserLockerAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewLockerAction, ...actions].map((action) =>
        action(props.locker),
      )}
    />
  );
}
