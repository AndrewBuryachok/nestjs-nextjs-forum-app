'use server';

import { completeRentSchema, continueRentSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const continueMyRentAction = actionClient
  .inputSchema(continueRentSchema)
  .action(({ parsedInput: { rentId } }) => {
    return send('POST', `/rents/${rentId}`);
  });

export const continueUserRentAction = actionClient
  .inputSchema(continueRentSchema)
  .action(({ parsedInput: { rentId } }) => {
    return send('POST', `/rents/all/${rentId}`);
  });

export const completeMyRentAction = actionClient
  .inputSchema(completeRentSchema)
  .action(({ parsedInput: { rentId } }) => {
    return send('DELETE', `/rents/${rentId}`);
  });

export const completeUserRentAction = actionClient
  .inputSchema(completeRentSchema)
  .action(({ parsedInput: { rentId } }) => {
    return send('DELETE', `/rents/all/${rentId}`);
  });
