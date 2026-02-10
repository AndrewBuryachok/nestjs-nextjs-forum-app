'use server';

import { createTransactionSchema, createTransferSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createDepositTransactionAction = actionClient
  .inputSchema(createTransactionSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/deposit', body);
  });

export const createWithdrawTransactionAction = actionClient
  .inputSchema(createTransactionSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/withdraw', body);
  });

export const createMyTransferTransactionAction = actionClient
  .inputSchema(createTransferSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/transfer', body);
  });

export const createUserTransferTransactionAction = actionClient
  .inputSchema(createTransferSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/transfer/all', body);
  });
