'use server';

import { createProductSchema, createProductWithUserSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyProductAction = actionClient
  .inputSchema(createProductSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products', body);
  });

export const createUserProductAction = actionClient
  .inputSchema(createProductWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/products/all', body);
  });
