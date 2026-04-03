import { PAGE_TABS_MAP } from '@/config/navigation';
import { Order } from '../types';
import { viewOrderAction } from '../actions/view-order-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  order: Order;
};

export default function OrdersActions(props: Props) {
  return (
    <CustomActions
      actions={[viewOrderAction].map((action) => action(props.order))}
    />
  );
}
