import { LuEye } from 'react-icons/lu';
import { Invoice } from '../types';
import ViewInvoiceForm from '../forms/view-invoice-form';
import { Color } from '@/constants/colors';

export const viewInvoiceAction = (invoice: Invoice) => ({
  action: 'view',
  dialog: 'invoice',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewInvoiceForm invoice={invoice} />,
});
