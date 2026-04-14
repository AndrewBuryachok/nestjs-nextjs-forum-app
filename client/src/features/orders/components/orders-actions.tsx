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
import {
  cancelMyOrderAction,
  cancelUserOrderAction,
} from '../actions/cancel-order-action';
import {
  executeMyOrderAction,
  executeUserOrderAction,
} from '../actions/execute-order-action';
import {
  completeMyOrderAction,
  completeUserOrderAction,
} from '../actions/complete-order-action';
import CustomActions from '@/components/custom-actions';
import { Status } from '@/constants/statuses';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  order: Order;
};

export default function OrdersActions(props: Props) {
  const allActions = (status: Status) => {
    switch (status) {
      case Status.CREATED:
        return [
          takeUserOrderAction,
          editUserOrderAction,
          deleteUserOrderAction,
        ];
      case Status.TAKEN:
        return [executeUserOrderAction, cancelUserOrderAction];
      case Status.EXECUTED:
        return [completeUserOrderAction];
      default:
        return [];
    }
  };

  const actions = {
    main: [takeMyOrderAction],
    my: [completeMyOrderAction, editMyOrderAction, deleteMyOrderAction],
    taken: [executeMyOrderAction, cancelMyOrderAction],
    all: allActions(props.order.status),
  }[props.tab];

  return (
    <CustomActions
      actions={[viewOrderAction, ...actions].map((action) =>
        action(props.order),
      )}
    />
  );
}
