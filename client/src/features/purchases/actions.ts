'use server';

import { deletePurchaseSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const deletePurchaseAction = actionClient
  .inputSchema(deletePurchaseSchema)
  .action(({ parsedInput: { purchaseId } }) => {
    return send('DELETE', `/purchases/${purchaseId}`);
  });
