'use server';

import {
  createLockerSchema,
  createLockerWithUserSchema,
  deleteLockerSchema,
  editLockerSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createLockerAction = actionClient
  .inputSchema(createLockerSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/lockers', body);
  });

export const createLockerWithUserAction = actionClient
  .inputSchema(createLockerWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/lockers/all', body);
  });

export const editMyLockerAction = actionClient
  .inputSchema(editLockerSchema)
  .action(({ parsedInput: { lockerId, ...body } }) => {
    return send('PATCH', `/lockers/${lockerId}`, body);
  });

export const editUserLockerAction = actionClient
  .inputSchema(editLockerSchema)
  .action(({ parsedInput: { lockerId, ...body } }) => {
    return send('PATCH', `/lockers/all/${lockerId}`, body);
  });

export const deleteMyLockerAction = actionClient
  .inputSchema(deleteLockerSchema)
  .action(({ parsedInput: { lockerId } }) => {
    return send('DELETE', `/lockers/${lockerId}`);
  });

export const deleteUserLockerAction = actionClient
  .inputSchema(deleteLockerSchema)
  .action(({ parsedInput: { lockerId } }) => {
    return send('DELETE', `/lockers/all/${lockerId}`);
  });
