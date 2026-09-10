'use server';

import {
  createFineSchema,
  createFineWithUserSchema,
  deleteFineSchema,
  editFineSchema,
  payFineSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyFineAction = actionClient
  .inputSchema(createFineSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/fines', body);
  });

export const createUserFineAction = actionClient
  .inputSchema(createFineWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/fines/all', body);
  });

export const editMyFineAction = actionClient
  .inputSchema(editFineSchema)
  .action(({ parsedInput: { fineId, ...body } }) => {
    return send('PATCH', `/fines/${fineId}`, body);
  });

export const editUserFineAction = actionClient
  .inputSchema(editFineSchema)
  .action(({ parsedInput: { fineId, ...body } }) => {
    return send('PATCH', `/fines/all/${fineId}`, body);
  });

export const deleteMyFineAction = actionClient
  .inputSchema(deleteFineSchema)
  .action(({ parsedInput: { fineId } }) => {
    return send('DELETE', `/fines/${fineId}`);
  });

export const deleteUserFineAction = actionClient
  .inputSchema(deleteFineSchema)
  .action(({ parsedInput: { fineId } }) => {
    return send('DELETE', `/fines/all/${fineId}`);
  });

export const payMyFineAction = actionClient
  .inputSchema(payFineSchema)
  .action(({ parsedInput: { fineId, ...body } }) => {
    return send('POST', `/fines/${fineId}`, body);
  });

export const payUserFineAction = actionClient
  .inputSchema(payFineSchema)
  .action(({ parsedInput: { fineId, ...body } }) => {
    return send('POST', `/fines/all/${fineId}`, body);
  });
