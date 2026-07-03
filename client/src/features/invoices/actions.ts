'use server';

import {
  createInvoiceSchema,
  createInvoiceWithUserSchema,
  deleteInvoiceSchema,
  editInvoiceSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyInvoiceAction = actionClient
  .inputSchema(createInvoiceSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/invoices', body);
  });

export const createUserInvoiceAction = actionClient
  .inputSchema(createInvoiceWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/invoices/all', body);
  });

export const editMyInvoiceAction = actionClient
  .inputSchema(editInvoiceSchema)
  .action(({ parsedInput: { invoiceId, ...body } }) => {
    return send('PATCH', `/invoices/${invoiceId}`, body);
  });

export const editUserInvoiceAction = actionClient
  .inputSchema(editInvoiceSchema)
  .action(({ parsedInput: { invoiceId, ...body } }) => {
    return send('PATCH', `/invoices/all/${invoiceId}`, body);
  });

export const deleteMyInvoiceAction = actionClient
  .inputSchema(deleteInvoiceSchema)
  .action(({ parsedInput: { invoiceId } }) => {
    return send('DELETE', `/invoices/${invoiceId}`);
  });

export const deleteUserInvoiceAction = actionClient
  .inputSchema(deleteInvoiceSchema)
  .action(({ parsedInput: { invoiceId } }) => {
    return send('DELETE', `/invoices/all/${invoiceId}`);
  });
