'use server';

import { createShopSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyShopAction = actionClient
  .inputSchema(createShopSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/shops', body);
  });

export const createUserShopAction = actionClient
  .inputSchema(createShopSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/shops/all', body);
  });
