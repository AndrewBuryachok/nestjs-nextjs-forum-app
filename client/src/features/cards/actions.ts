'use server';

import {
  createCardSchema,
  createCardWithUserSchema,
  deleteCardSchema,
  editCardSchema,
  updateCardUserSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createCardAction = actionClient
  .inputSchema(createCardSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/cards', body);
  });

export const createCardWithUserAction = actionClient
  .inputSchema(createCardWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/cards/all', body);
  });

export const editMyCardAction = actionClient
  .inputSchema(editCardSchema)
  .action(({ parsedInput: { cardId, ...body } }) => {
    return send('PATCH', `/cards/${cardId}`, body);
  });

export const editUserCardAction = actionClient
  .inputSchema(editCardSchema)
  .action(({ parsedInput: { cardId, ...body } }) => {
    return send('PATCH', `/cards/all/${cardId}`, body);
  });

export const deleteMyCardAction = actionClient
  .inputSchema(deleteCardSchema)
  .action(({ parsedInput: { cardId } }) => {
    return send('DELETE', `/cards/${cardId}`);
  });

export const deleteUserCardAction = actionClient
  .inputSchema(deleteCardSchema)
  .action(({ parsedInput: { cardId } }) => {
    return send('DELETE', `/cards/all/${cardId}`);
  });

export const addMyCardUserAction = actionClient
  .inputSchema(updateCardUserSchema)
  .action(({ parsedInput: { cardId, ...body } }) => {
    return send('POST', `/cards/${cardId}/users`, body);
  });

export const addUserCardUserAction = actionClient
  .inputSchema(updateCardUserSchema)
  .action(({ parsedInput: { cardId, ...body } }) => {
    return send('POST', `/cards/all/${cardId}/users`, body);
  });

export const removeMyCardUserAction = actionClient
  .inputSchema(updateCardUserSchema)
  .action(({ parsedInput: { cardId, ...body } }) => {
    return send('DELETE', `/cards/${cardId}/users`, body);
  });

export const removeUserCardUserAction = actionClient
  .inputSchema(updateCardUserSchema)
  .action(({ parsedInput: { cardId, ...body } }) => {
    return send('DELETE', `/cards/all/${cardId}/users`, body);
  });
