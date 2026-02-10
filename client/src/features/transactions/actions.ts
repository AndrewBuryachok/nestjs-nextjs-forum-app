'use server';

import {
  createTransactionWithUserSchema,
  createTransferWithReceiverSchema,
  createTransferWithSenderSchema,
} from './schema';
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

export const createMyTransferTransactionAction = actionClient
  .inputSchema(createTransferWithReceiverSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/transfer', body);
  });

export const createUserTransferTransactionAction = actionClient
  .inputSchema(createTransferWithSenderSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/transactions/transfer/all', body);
  });
