import { PAGE_TABS_MAP } from '@/config/navigation';
import { Shop } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import ShopsActions from './shops-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ShopsTable(props: Props) {
  return (
    <CustomTable<Shop>
      page='shops'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'owner',
          render: (shop) => <CustomAvatarWithCard card={shop.card} />,
        },
        {
          value: 'shop',
          render: (shop) => <CustomText value={shop.name} />,
        },
        {
          value: 'x',
          render: (shop) => <CustomText value={`${shop.x}`} />,
        },
        {
          value: 'y',
          render: (shop) => <CustomText value={`${shop.y}`} />,
        },
        {
          value: 'created',
          render: (shop) => <DateText value={shop.createdAt} />,
        },
        {
          value: 'actions',
          render: (shop) => <ShopsActions tab={props.tab} shop={shop} />,
        },
      ]}
    />
  );
}
