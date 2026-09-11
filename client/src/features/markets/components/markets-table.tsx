import { PAGE_TABS_MAP } from '@/config/navigation';
import { Market } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import MarketsActions from './markets-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.markets;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function MarketsTable(props: Props) {
  return (
    <CustomTable<Market>
      page='markets'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'owner',
          render: (market) => (
            <CustomAvatarWithCard user={market.user} card={market.card} />
          ),
        },
        {
          value: 'market',
          render: (market) => <CustomText value={market.name} />,
        },
        {
          value: 'x',
          render: (market) => <CustomText value={`${market.x}`} />,
        },
        {
          value: 'y',
          render: (market) => <CustomText value={`${market.y}`} />,
        },
        {
          value: 'created',
          render: (market) => <DateText value={market.createdAt} />,
        },
        {
          value: 'actions',
          render: (market) => (
            <MarketsActions tab={props.tab} market={market} />
          ),
        },
      ]}
    />
  );
}
