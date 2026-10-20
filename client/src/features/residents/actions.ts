'use server';

import { deleteResidentSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const leaveTownAction = actionClient.action(() => {
  return send('DELETE', '/residents/me');
});

export const deleteResidentAction = actionClient
  .inputSchema(deleteResidentSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('DELETE', `/residents/${userId}`);
  });
