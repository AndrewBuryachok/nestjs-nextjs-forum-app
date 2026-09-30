'use server';

import {
  createTownSchema,
  createTownWithUserSchema,
  deleteTownSchema,
  editTownSchema,
  updateTownUserSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createTownAction = actionClient
  .inputSchema(createTownSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/towns', body);
  });

export const createTownWithUserAction = actionClient
  .inputSchema(createTownWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/towns/all', body);
  });

export const editMyTownAction = actionClient
  .inputSchema(editTownSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('PATCH', `/towns/${townId}`, body);
  });

export const editUserTownAction = actionClient
  .inputSchema(editTownSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('PATCH', `/towns/all/${townId}`, body);
  });

export const deleteMyTownAction = actionClient
  .inputSchema(deleteTownSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('DELETE', `/towns/${townId}`);
  });

export const deleteUserTownAction = actionClient
  .inputSchema(deleteTownSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('DELETE', `/towns/all/${townId}`);
  });

export const addMyTownUserAction = actionClient
  .inputSchema(updateTownUserSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('POST', `/towns/${townId}/users`, body);
  });

export const addUserTownUserAction = actionClient
  .inputSchema(updateTownUserSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('POST', `/towns/all/${townId}/users`, body);
  });

export const removeMyTownUserAction = actionClient
  .inputSchema(updateTownUserSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('DELETE', `/towns/${townId}/users`, body);
  });

export const removeUserTownUserAction = actionClient
  .inputSchema(updateTownUserSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('DELETE', `/towns/all/${townId}/users`, body);
  });
