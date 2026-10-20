'use server';

import { deleteResidentSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const deleteResidentAction = actionClient
  .inputSchema(deleteResidentSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('DELETE', `/residents/${userId}`);
  });
