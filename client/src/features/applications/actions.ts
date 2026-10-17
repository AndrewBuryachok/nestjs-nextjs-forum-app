'use server';

import {
  acceptOrRejectApplicationSchema,
  createOrDeleteApplicationSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createApplicationAction = actionClient
  .inputSchema(createOrDeleteApplicationSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/applications', body);
  });

export const deleteApplicationAction = actionClient
  .inputSchema(createOrDeleteApplicationSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('DELETE', `/applications/${townId}`);
  });

export const acceptApplicationAction = actionClient
  .inputSchema(acceptOrRejectApplicationSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('POST', `/applications/${userId}/accept`);
  });

export const rejectApplicationAction = actionClient
  .inputSchema(acceptOrRejectApplicationSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('POST', `/applications/${userId}/reject`);
  });
