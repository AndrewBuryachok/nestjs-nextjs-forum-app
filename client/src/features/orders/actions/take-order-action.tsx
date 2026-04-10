import { LuPlus } from 'react-icons/lu';
import { Order } from '../types';
import TakeOrderForm from '../forms/take-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const takeOrderFactory = (order: Order, isAll: boolean) => ({
  action: 'take',
  dialog: 'order',
  color: Color.GREEN,
  disabled: order.status !== Status.CREATED,
  icon: <LuPlus />,
  body: <TakeOrderForm order={order} isAll={isAll} />,
});

export const takeMyOrderAction = (order: Order) =>
  takeOrderFactory(order, false);

export const takeUserOrderAction = (order: Order) =>
  takeOrderFactory(order, true);
