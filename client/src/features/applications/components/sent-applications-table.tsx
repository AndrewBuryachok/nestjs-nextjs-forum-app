import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../../towns/types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import CustomText from '@/components/custom-text';
import LevelBadge from '@/components/level-badge';
import TownsResidentsActions from '../../towns/components/towns-residents-actions';
import DateText from '@/components/date-text';
import SentApplicationsActions from './sent-applications-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function SentApplicationsTable(props: Props) {
  return (
    <CustomTable<Town>
      page='applications'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'mayor',
          render: (town) => <CustomAvatarWithUser user={town.user} />,
        },
        {
          value: 'town',
          render: (town) => <CustomText value={town.name} />,
        },
        {
          value: 'x',
          render: (town) => <CustomText value={`${town.x}`} />,
        },
        {
          value: 'y',
          render: (town) => <CustomText value={`${town.y}`} />,
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
          render: (town) => <SentApplicationsActions town={town} />,
        },
      ]}
    />
  );
}
