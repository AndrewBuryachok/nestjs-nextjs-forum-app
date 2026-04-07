'use server';

import { createOrderSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyOrderAction = actionClient
  .inputSchema(createOrderSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/orders', body);
  });

export const createUserOrderAction = actionClient
  .inputSchema(createOrderSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/orders/all', body);
  });
