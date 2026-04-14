import { LuPlus } from 'react-icons/lu';
import { Order } from '../types';
import ExecuteOrderForm from '../forms/execute-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const executeOrderFactory = (order: Order, isAll: boolean) => ({
  action: 'execute',
  dialog: 'order',
  color: Color.GREEN,
  disabled: order.status !== Status.TAKEN,
  icon: <LuPlus />,
  body: <ExecuteOrderForm order={order} isAll={isAll} />,
});

export const executeMyOrderAction = (order: Order) =>
  executeOrderFactory(order, false);

export const executeUserOrderAction = (order: Order) =>
  executeOrderFactory(order, true);
