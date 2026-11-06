import { LuCheck } from 'react-icons/lu';
import { Order } from '../types';
import TakeOrderForm from '../forms/take-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const takeOrderFactory = (order: Order, isAll: boolean) => ({
  button: true,
  action: 'take',
  dialog: 'order',
  color: Color.GREEN,
  disabled: order.status !== Status.CREATED,
  icon: <LuCheck />,
  body: <TakeOrderForm order={order} isAll={isAll} />,
});

export const takeMyOrderAction = (order: Order) =>
  takeOrderFactory(order, false);

export const takeUserOrderAction = (order: Order) =>
  takeOrderFactory(order, true);
