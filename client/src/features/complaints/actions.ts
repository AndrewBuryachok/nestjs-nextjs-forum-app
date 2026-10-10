'use server';

import {
  closeComplaintSchema,
  createComplaintMessageSchema,
  createComplaintWithReceiverSchema,
  createComplaintWithSenderSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyComplaintAction = actionClient
  .inputSchema(createComplaintWithReceiverSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/complaints', body);
  });

export const createUserComplaintAction = actionClient
  .inputSchema(createComplaintWithSenderSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/complaints/all', body);
  });

export const closeComplaintAction = actionClient
  .inputSchema(closeComplaintSchema)
  .action(({ parsedInput: { complaintId, ...body } }) => {
    return send('POST', `/complaints/${complaintId}`, body);
  });

export const createComplaintMessageAction = actionClient
  .inputSchema(createComplaintMessageSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/complaints/messages', body);
  });
