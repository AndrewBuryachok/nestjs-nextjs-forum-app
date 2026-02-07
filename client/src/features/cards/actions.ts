'use server';

import { createCardSchema, createCardWithUserSchema } from './schema';
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
