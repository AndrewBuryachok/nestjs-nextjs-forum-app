'use server';

import { createMarketSchema, createMarketWithUserSchema } from './schema';
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
