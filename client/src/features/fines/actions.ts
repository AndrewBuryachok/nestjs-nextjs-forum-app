'use server';

import {
  createFineWithUserSchema,
  deleteFineSchema,
  editFineSchema,
  payFineSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createFineAction = actionClient
  .inputSchema(createFineWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/fines', body);
  });

export const editFineAction = actionClient
  .inputSchema(editFineSchema)
  .action(({ parsedInput: { fineId, ...body } }) => {
    return send('PATCH', `/fines/${fineId}`, body);
  });

export const deleteFineAction = actionClient
  .inputSchema(deleteFineSchema)
  .action(({ parsedInput: { fineId } }) => {
    return send('DELETE', `/fines/${fineId}`);
  });

export const payFineAction = actionClient
  .inputSchema(payFineSchema)
  .action(({ parsedInput: { fineId, ...body } }) => {
    return send('POST', `/fines/${fineId}`, body);
  });
