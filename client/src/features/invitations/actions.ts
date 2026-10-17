'use server';

import {
  acceptOrRejectInvitationSchema,
  createOrDeleteInvitationSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const createInvitationAction = actionClient
  .inputSchema(createOrDeleteInvitationSchema)
  .action(({ parsedInput: body }) => {
    return send('POST', '/invitations', body);
  });

export const deleteInvitationAction = actionClient
  .inputSchema(createOrDeleteInvitationSchema)
  .action(({ parsedInput: { userId } }) => {
    return send('DELETE', `/invitations/${userId}`);
  });

export const acceptInvitationAction = actionClient
  .inputSchema(acceptOrRejectInvitationSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('POST', `/invitations/${townId}/accept`);
  });

export const rejectInvitationAction = actionClient
  .inputSchema(acceptOrRejectInvitationSchema)
  .action(({ parsedInput: { townId } }) => {
    return send('POST', `/invitations/${townId}/reject`);
  });
