'use server';

import { createApplicationSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createApplicationAction = actionClient
  .inputSchema(createApplicationSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/applications', body);
  });
