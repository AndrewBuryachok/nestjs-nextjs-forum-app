import { LuPlus } from 'react-icons/lu';
import { Invoice } from '../types';
import PayInvoiceForm from '../forms/pay-invoice-form';
import { Color } from '@/constants/colors';

export const payInvoiceFactory = (invoice: Invoice, isAll: boolean) => ({
  action: 'pay',
  dialog: 'invoice',
  color: Color.GREEN,
  disabled: !!invoice.paidAt,
  userId: isAll ? 0 : invoice.receiverUser.id,
  icon: <LuPlus />,
  body: <PayInvoiceForm invoice={invoice} isAll={isAll} />,
});

export const payMyInvoiceAction = (invoice: Invoice) =>
  payInvoiceFactory(invoice, false);

export const payUserInvoiceAction = (invoice: Invoice) =>
  payInvoiceFactory(invoice, true);
