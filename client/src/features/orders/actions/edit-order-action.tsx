import { LuPencil } from 'react-icons/lu';
import { Order } from '../types';
import EditOrderForm from '../forms/edit-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const editOrderFactory = (order: Order, isAll: boolean) => ({
  action: 'edit',
  dialog: 'order',
  color: Color.YELLOW,
  disabled: order.status !== Status.CREATED,
  icon: <LuPencil />,
  body: <EditOrderForm order={order} isAll={isAll} />,
});

export const editMyOrderAction = (order: Order) =>
  editOrderFactory(order, false);

export const editUserOrderAction = (order: Order) =>
  editOrderFactory(order, true);
