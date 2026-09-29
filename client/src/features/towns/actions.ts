'use server';

import { createTownSchema, createTownWithUserSchema } from './schema';
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
