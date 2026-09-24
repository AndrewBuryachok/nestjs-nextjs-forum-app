import { PAGE_TABS_MAP } from '@/config/navigation';
import { Rent } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import PlaceText from '@/components/place-text';
import CurrencyText from '@/components/currency-text';
import DateText from '@/components/date-text';
import RentsActions from './rents-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function RentsTable(props: Props) {
  return (
    <CustomTable<Rent>
      page='rents'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'renter',
          render: (rent) => (
            <CustomAvatarWithCard user={rent.user} card={rent.card} />
          ),
        },
        {
          value: 'owner',
          render: (rent) => (
            <CustomAvatarWithCard user={rent.plot.user} card={rent.plot.card} />
          ),
        },
        {
          value: 'plot',
          render: (rent) => <PlaceText place={rent.plot} />,
        },
        {
          value: 'price',
          render: (rent) => <CurrencyText value={rent.plot.price} />,
        },
        {
          value: 'completed',
          render: (rent) => <DateText value={rent.completedAt} />,
        },
        {
          value: 'actions',
          render: (rent) => <RentsActions tab={props.tab} rent={rent} />,
        },
      ]}
    />
  );
}
