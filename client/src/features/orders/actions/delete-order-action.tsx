import { LuTrash2 } from 'react-icons/lu';
import { Order } from '../types';
import DeleteOrderForm from '../forms/delete-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const deleteOrderFactory = (order: Order, isAll: boolean) => ({
  action: 'delete',
  dialog: 'order',
  color: Color.RED,
  disabled: order.status !== Status.CREATED,
  userId: isAll ? 0 : order.customerUser.id,
  icon: <LuTrash2 />,
  body: <DeleteOrderForm order={order} isAll={isAll} />,
});

export const deleteMyOrderAction = (order: Order) =>
  deleteOrderFactory(order, false);

export const deleteUserOrderAction = (order: Order) =>
  deleteOrderFactory(order, true);
