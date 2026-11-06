import { LuCheck } from 'react-icons/lu';
import { Order } from '../types';
import ExecuteOrderForm from '../forms/execute-order-form';
import { Color } from '@/constants/colors';
import { Status } from '@/constants/statuses';

export const executeOrderFactory = (order: Order, isAll: boolean) => ({
  button: true,
  action: 'execute',
  dialog: 'order',
  color: Color.GREEN,
  disabled: order.status !== Status.TAKEN,
  userId: isAll ? 0 : order.executorUser?.id,
  icon: <LuCheck />,
  body: <ExecuteOrderForm order={order} isAll={isAll} />,
});

export const executeMyOrderAction = (order: Order) =>
  executeOrderFactory(order, false);

export const executeUserOrderAction = (order: Order) =>
  executeOrderFactory(order, true);
