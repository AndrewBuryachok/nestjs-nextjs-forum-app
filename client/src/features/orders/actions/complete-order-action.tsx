import { LuPlus } from 'react-icons/lu';
import { Order } from '../types';
import CompleteOrderForm from '../forms/complete-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const completeOrderFactory = (order: Order, isAll: boolean) => ({
  action: 'complete',
  dialog: 'order',
  color: Color.GREEN,
  disabled: order.status !== Status.EXECUTED,
  icon: <LuPlus />,
  body: <CompleteOrderForm order={order} isAll={isAll} />,
});

export const completeMyOrderAction = (order: Order) =>
  completeOrderFactory(order, false);

export const completeUserOrderAction = (order: Order) =>
  completeOrderFactory(order, true);
