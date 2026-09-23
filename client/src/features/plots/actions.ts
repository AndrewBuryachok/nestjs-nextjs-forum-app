'use server';

import { createPlotSchema, createPlotWithUserSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createMyPlotAction = actionClient
  .inputSchema(createPlotSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/plots', body);
  });

export const createUserPlotAction = actionClient
  .inputSchema(createPlotWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/plots/all', body);
  });
