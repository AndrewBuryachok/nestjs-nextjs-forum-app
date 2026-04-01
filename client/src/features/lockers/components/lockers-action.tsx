import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateLockerForm from '../forms/create-locker-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
};

export default function LockersAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='locker'
      body={<CreateLockerForm isAll={props.tab === 'all'} />}
    />
  );
}
