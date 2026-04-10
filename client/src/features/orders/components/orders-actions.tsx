import { PAGE_TABS_MAP } from '@/config/navigation';
import { Order } from '../types';
import { viewOrderAction } from '../actions/view-order-action';
import {
  editMyOrderAction,
  editUserOrderAction,
} from '../actions/edit-order-action';
import {
  deleteMyOrderAction,
  deleteUserOrderAction,
} from '../actions/delete-order-action';
import {
  takeMyOrderAction,
  takeUserOrderAction,
} from '../actions/take-order-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  order: Order;
};

export default function OrdersActions(props: Props) {
  const actions = {
    main: [takeMyOrderAction],
    my: [editMyOrderAction, deleteMyOrderAction],
    taken: [],
    all: [takeUserOrderAction, editUserOrderAction, deleteUserOrderAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewOrderAction, ...actions].map((action) =>
        action(props.order),
      )}
    />
  );
}
