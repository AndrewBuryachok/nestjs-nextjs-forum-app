import { PAGE_TABS_MAP } from '@/config/navigation';
import { Good } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import ItemImageWithText from '@/components/item-image-with-text';
import AmountText from '@/components/amount-text';
import CurrencyText from '@/components/currency-text';
import PlaceText from '@/components/place-text';
import DateText from '@/components/date-text';
import GoodsActions from './goods-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.goods;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function GoodsTable(props: Props) {
  return (
    <CustomTable<Good>
      page='goods'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'seller',
          render: (good) => <CustomAvatarWithCard card={good.shop.card} />,
        },
        {
          value: 'item',
          render: (good) => (
            <ItemImageWithText
              item={good.item}
              description={good.description}
            />
          ),
        },
        {
          value: 'amount',
          render: (good) => (
            <AmountText value={[good.amount, good.batch, good.unit]} />
          ),
        },
        {
          value: 'price',
          render: (good) => <CurrencyText value={good.price} />,
        },
        {
          value: 'shop',
          render: (good) => <PlaceText place={good.shop} />,
        },
        {
          value: 'created',
          render: (good) => <DateText value={good.createdAt} />,
        },
        {
          value: 'actions',
          render: (good) => <GoodsActions tab={props.tab} good={good} />,
        },
      ]}
    />
  );
}
