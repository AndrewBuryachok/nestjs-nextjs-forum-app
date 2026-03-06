'use server';

import { createGoodSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyGoodAction = actionClient
  .inputSchema(createGoodSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/goods', body);
  });

export const createUserGoodAction = actionClient
  .inputSchema(createGoodSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/goods/all', body);
  });
