import { PAGE_TABS_MAP } from '@/config/navigation';
import { Locker } from '../types';
import { viewLockerAction } from '../actions/view-locker-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
  locker: Locker;
};

export default function LockersActions(props: Props) {
  return (
    <CustomActions
      actions={[viewLockerAction].map((action) => action(props.locker))}
    />
  );
}
