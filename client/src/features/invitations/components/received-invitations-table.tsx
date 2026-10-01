import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../../towns/types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import PlaceText from '@/components/place-text';
import LevelBadge from '@/components/level-badge';
import TownsResidentsActions from '../../towns/components/towns-residents-actions';
import DateText from '@/components/date-text';
import ReceivedInvitationsActions from './received-invitations-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invitations;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ReceivedInvitationsTable(props: Props) {
  return (
    <CustomTable<Town>
      page='invitations'
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
          value: 'level',
          render: (town) => <LevelBadge level={town.level} />,
        },
        {
          value: 'residents',
          render: (town) => <TownsResidentsActions tab='main' town={town} />,
        },
        {
          value: 'created',
          render: (town) => <DateText value={town.createdAt} />,
        },
        {
          value: 'actions',
          render: (town) => <ReceivedInvitationsActions town={town} />,
        },
      ]}
    />
  );
}
