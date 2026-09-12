import { PAGE_TABS_MAP } from '@/config/navigation';
import { Order } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithCard from '@/components/custom-avatar-with-card';
import ItemImageWithText from '@/components/item-image-with-text';
import AmountText from '@/components/amount-text';
import CurrencyText from '@/components/currency-text';
import StatusBadge from '@/components/status-badge';
import PlaceText from '@/components/place-text';
import DateText from '@/components/date-text';
import CustomText from '@/components/custom-text';
import OrdersActions from './orders-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function OrdersTable(props: Props) {
  return (
    <CustomTable<Order>
      page='orders'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'customer',
          render: (order) => (
            <CustomAvatarWithCard
              user={order.customerUser}
              card={order.customerCard}
            />
          ),
        },
        {
          value: 'item',
          render: (order) => (
            <ItemImageWithText
              item={order.item}
              description={order.description}
            />
          ),
        },
        {
          value: 'amount',
          render: (order) => (
            <AmountText value={[order.amount, order.batch, order.unit]} />
          ),
        },
        {
          value: 'sum',
          render: (order) => <CurrencyText value={order.sum} />,
        },
        {
          value: 'status',
          render: (order) => <StatusBadge status={order.status} />,
        },
        {
          value: 'locker',
          render: (order) => <PlaceText place={order.locker} />,
        },
        props.tab === 'main' || props.tab === 'my'
          ? {
              value: 'created',
              render: (order) => <DateText value={order.createdAt} />,
            }
          : {
              value: 'paid',
              render: (order) =>
                order.completedAt ? (
                  <DateText value={order.completedAt} />
                ) : (
                  <CustomText muted value='-' />
                ),
            },
        {
          value: 'actions',
          render: (order) => <OrdersActions tab={props.tab} order={order} />,
        },
      ]}
    />
  );
}
