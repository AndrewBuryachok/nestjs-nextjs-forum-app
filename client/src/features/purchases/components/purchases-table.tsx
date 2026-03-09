import { PAGE_TABS_MAP } from '@/config/navigation';
import { Purchase } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import ItemImageWithText from '@/components/item-image-with-text';
import AmountText from '@/components/amount-text';
import CurrencyText from '@/components/currency-text';
import PlaceText from '@/components/place-text';
import DateText from '@/components/date-text';
import PurchasesActions from './purchases-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.purchases;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function PurchasesTable(props: Props) {
  return (
    <CustomTable<Purchase>
      page='purchases'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'buyer',
          render: (purchase) => (
            <CustomAvatarWithCard user={purchase.user} card={purchase.card} />
          ),
        },
        {
          value: 'seller',
          render: (purchase) => (
            <CustomAvatarWithCard
              user={purchase.product.user}
              card={purchase.product.shop.card}
            />
          ),
        },
        {
          value: 'item',
          render: (purchase) => (
            <ItemImageWithText
              item={purchase.product.item}
              description={purchase.product.description}
            />
          ),
        },
        {
          value: 'amount',
          render: (purchase) => (
            <AmountText
              value={[
                purchase.amount,
                purchase.product.batch,
                purchase.product.unit,
              ]}
            />
          ),
        },
        {
          value: 'sum',
          render: (purchase) => (
            <CurrencyText value={purchase.amount * purchase.price} />
          ),
        },
        {
          value: 'shop',
          render: (purchase) => <PlaceText place={purchase.product.shop} />,
        },
        {
          value: 'created',
          render: (purchase) => <DateText value={purchase.createdAt} />,
        },
        {
          value: 'actions',
          render: (purchase) => (
            <PurchasesActions tab={props.tab} purchase={purchase} />
          ),
        },
      ]}
    />
  );
}
