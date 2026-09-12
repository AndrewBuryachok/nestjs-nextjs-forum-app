import { PAGE_TABS_MAP } from '@/config/navigation';
import { Plot } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomText from '@/components/custom-text';
import CurrencyText from '@/components/currency-text';
import PlaceText from '@/components/place-text';
import DateText from '@/components/date-text';
import PlotsActions from './plots-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.plots;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function PlotsTable(props: Props) {
  return (
    <CustomTable<Plot>
      page='plots'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'owner',
          render: (plot) => (
            <CustomAvatarWithCard
              user={plot.market.user}
              card={plot.market.card}
            />
          ),
        },
        {
          value: 'plot',
          render: (plot) => <CustomText value={plot.name} />,
        },
        {
          value: 'x',
          render: (plot) => <CustomText value={`${plot.x}`} />,
        },
        {
          value: 'y',
          render: (plot) => <CustomText value={`${plot.y}`} />,
        },
        {
          value: 'price',
          render: (product) => <CurrencyText value={product.price} />,
        },
        {
          value: 'market',
          render: (plot) => <PlaceText place={plot.market} />,
        },
        {
          value: 'reserved',
          render: (plot) =>
            plot.reservedUntil ? (
              <DateText value={plot.reservedUntil} />
            ) : (
              <CustomText muted value='-' />
            ),
        },
        {
          value: 'actions',
          render: (plot) => <PlotsActions tab={props.tab} plot={plot} />,
        },
      ]}
    />
  );
}
