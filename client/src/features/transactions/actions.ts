'use server';

import { createTransactionWithUserSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createDepositTransactionAction = actionClient
  .inputSchema(createTransactionWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/deposit', body);
  });

export const createWithdrawTransactionAction = actionClient
  .inputSchema(createTransactionWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/withdraw', body);
  });
