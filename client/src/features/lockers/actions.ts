'use server';

import { createLockerSchema, createLockerWithUserSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createLockerAction = actionClient
  .inputSchema(createLockerSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/lockers', body);
  });

export const createLockerWithUserAction = actionClient
  .inputSchema(createLockerWithUserSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/lockers/all', body);
  });
