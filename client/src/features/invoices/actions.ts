'use server';

import { createInvoiceSchema, createInvoiceWithUserSchema } from './schema';
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
