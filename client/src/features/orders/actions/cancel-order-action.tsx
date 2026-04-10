import { LuMinus } from 'react-icons/lu';
import { Order } from '../types';
import CancelOrderForm from '../forms/cancel-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const cancelOrderFactory = (order: Order, isAll: boolean) => ({
  action: 'cancel',
  dialog: 'order',
  color: Color.RED,
  disabled: order.status !== Status.TAKEN,
  icon: <LuMinus />,
  body: <CancelOrderForm order={order} isAll={isAll} />,
});

export const cancelMyOrderAction = (order: Order) =>
  cancelOrderFactory(order, false);

export const cancelUserOrderAction = (order: Order) =>
  cancelOrderFactory(order, true);
