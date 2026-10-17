'use server';

import { createInvitationSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createInvitationAction = actionClient
  .inputSchema(createInvitationSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/invitations', body);
  });
