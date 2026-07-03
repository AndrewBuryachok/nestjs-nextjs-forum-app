import { LuTrash2 } from 'react-icons/lu';
import { Invoice } from '../types';
import DeleteInvoiceForm from '../forms/delete-invoice-form';
import { Color } from '@/constants/colors';

export const deleteInvoiceFactory = (invoice: Invoice, isAll: boolean) => ({
  action: 'delete',
  dialog: 'invoice',
  color: Color.RED,
  disabled: !!invoice.paidAt,
  userId: isAll ? 0 : invoice.senderUser.id,
  icon: <LuTrash2 />,
  body: <DeleteInvoiceForm invoice={invoice} isAll={isAll} />,
});

export const deleteMyInvoiceAction = (invoice: Invoice) =>
  deleteInvoiceFactory(invoice, false);

export const deleteUserInvoiceAction = (invoice: Invoice) =>
  deleteInvoiceFactory(invoice, true);
