'use server';

import {
  createTownSchema,
  createTownWithUserSchema,
  editTownSchema,
  updateTownChunkSchema,
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

export const upgradeMyTownAction = actionClient
  .inputSchema(upgradeTownSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('POST', `/towns/${townId}`);
  });

export const upgradeUserTownAction = actionClient
  .inputSchema(upgradeTownSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('POST', `/towns/all/${townId}`);
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

export const addMyTownChunkAction = actionClient
  .inputSchema(updateTownChunkSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('POST', `/towns/${townId}/chunks`, body);
  });

export const addUserTownChunkAction = actionClient
  .inputSchema(updateTownChunkSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('POST', `/towns/all/${townId}/chunks`, body);
  });

export const removeMyTownChunkAction = actionClient
  .inputSchema(updateTownChunkSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('DELETE', `/towns/${townId}/chunks`, body);
  });

export const removeUserTownChunkAction = actionClient
  .inputSchema(updateTownChunkSchema)
  .action(({ parsedInput: { townId, ...body } }) => {
    return send('DELETE', `/towns/all/${townId}/chunks`, body);
  });
