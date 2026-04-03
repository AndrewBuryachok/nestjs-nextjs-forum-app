import { LuEye } from 'react-icons/lu';
import { Order } from '../types';
import ViewOrderForm from '../forms/view-order-form';
import { Color } from '@/constants/colors';

export const viewOrderAction = (order: Order) => ({
  action: 'view',
  dialog: 'order',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewOrderForm order={order} />,
});
