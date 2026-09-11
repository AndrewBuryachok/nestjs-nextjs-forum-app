'use server';

import {
  createMarketSchema,
  createMarketWithUserSchema,
  deleteMarketSchema,
  editMarketSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyMarketAction = actionClient
  .inputSchema(createMarketSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/markets', body);
  });

export const createUserMarketAction = actionClient
  .inputSchema(createMarketWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/markets/all', body);
  });

export const editMyMarketAction = actionClient
  .inputSchema(editMarketSchema)
  .action(({ parsedInput: { marketId, ...body } }) => {
    return send('PATCH', `/markets/${marketId}`, body);
  });

export const editUserMarketAction = actionClient
  .inputSchema(editMarketSchema)
  .action(({ parsedInput: { marketId, ...body } }) => {
    return send('PATCH', `/markets/all/${marketId}`, body);
  });

export const deleteMyMarketAction = actionClient
  .inputSchema(deleteMarketSchema)
  .action(({ parsedInput: { marketId } }) => {
    return send('DELETE', `/markets/${marketId}`);
  });

export const deleteUserMarketAction = actionClient
  .inputSchema(deleteMarketSchema)
  .action(({ parsedInput: { marketId } }) => {
    return send('DELETE', `/markets/all/${marketId}`);
  });
