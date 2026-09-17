'use server';

import { createLandmarkSchema, createLandmarkWithUserSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createLandmarkAction = actionClient
  .inputSchema(createLandmarkSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/landmarks', body);
  });

export const createLandmarkWithUserAction = actionClient
  .inputSchema(createLandmarkWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/landmarks/all', body);
  });
