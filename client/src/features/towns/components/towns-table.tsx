import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import PlaceText from '@/components/place-text';
import TownsUsersActions from './towns-users-actions';
import DateText from '@/components/date-text';
import TownsActions from './towns-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TownsTable(props: Props) {
  return (
    <CustomTable<Town>
      page='towns'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'mayor',
          render: (town) => <CustomAvatarWithUser user={town.user} />,
        },
        {
          value: 'town',
          render: (town) => <PlaceText place={town} />,
        },
        {
          value: 'residents',
          render: (town) => <TownsUsersActions tab={props.tab} town={town} />,
        },
        {
          value: 'created',
          render: (town) => <DateText value={town.createdAt} />,
        },
        {
          value: 'actions',
          render: (town) => <TownsActions tab={props.tab} town={town} />,
        },
      ]}
    />
  );
}
