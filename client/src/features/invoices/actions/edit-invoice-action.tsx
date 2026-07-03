import { LuPencil } from 'react-icons/lu';
import { Invoice } from '../types';
import EditInvoiceForm from '../forms/edit-invoice-form';
import { Color } from '@/constants/colors';

export const editInvoiceFactory = (invoice: Invoice, isAll: boolean) => ({
  action: 'edit',
  dialog: 'invoice',
  color: Color.YELLOW,
  disabled: !!invoice.paidAt,
  userId: isAll ? 0 : invoice.senderUser.id,
  icon: <LuPencil />,
  body: <EditInvoiceForm invoice={invoice} isAll={isAll} />,
});

export const editMyInvoiceAction = (invoice: Invoice) =>
  editInvoiceFactory(invoice, false);

export const editUserInvoiceAction = (invoice: Invoice) =>
  editInvoiceFactory(invoice, true);
