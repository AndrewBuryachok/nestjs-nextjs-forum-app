import { LuEye } from 'react-icons/lu';
import { Order } from '../types';
import ViewOrderForm from '../forms/view-order-form';

export const viewOrderAction = (order: Order) => ({
  action: 'view',
  dialog: 'order',
  icon: <LuEye />,
  body: <ViewOrderForm order={order} />,
});
