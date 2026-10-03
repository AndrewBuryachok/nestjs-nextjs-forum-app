'use server';

import { updateLicenseSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createLicenseAction = actionClient
  .inputSchema(updateLicenseSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('POST', `/licenses/${userId}`);
  });

export const deleteLicenseAction = actionClient
  .inputSchema(updateLicenseSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('DELETE', `/licenses/${userId}`);
  });
