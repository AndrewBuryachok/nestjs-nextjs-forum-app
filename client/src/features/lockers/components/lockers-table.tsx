import { PAGE_TABS_MAP } from '@/config/navigation';
import { Locker } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import PlaceText from '@/components/place-text';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import LockersActions from './lockers-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LockersTable(props: Props) {
  return (
    <CustomTable<Locker>
      page='lockers'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'owner',
          render: (locker) => <CustomAvatarWithUser user={locker.user} />,
        },
        {
          value: 'locker',
          render: (locker) => <PlaceText place={locker} />,
        },
        {
          value: 'cells',
          render: (locker) => (
            <CustomText
              value={`${locker.cells - locker.orders}/${locker.cells}`}
            />
          ),
        },
        {
          value: 'created',
          render: (locker) => <DateText value={locker.createdAt} />,
        },
        {
          value: 'actions',
          render: (locker) => (
            <LockersActions tab={props.tab} locker={locker} />
          ),
        },
      ]}
    />
  );
}
