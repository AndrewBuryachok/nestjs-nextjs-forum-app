'use server';

import {
  createTownSchema,
  createTownWithUserSchema,
  editTownSchema,
  upgradeTownSchema,
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

export const upgradeTownAction = actionClient
  .inputSchema(upgradeTownSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('POST', `/towns/${townId}`);
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
