'use server';

import { editUserProfileSchema, updateUserRoleSchema } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';

export const editUserProfileAction = actionClient
  .inputSchema(editUserProfileSchema)
  .action(({ parsedInput: { userId, ...body } }) => {
    return send('PATCH', `/users/${userId}/profile`, body);
  });

export const addUserRoleAction = actionClient
  .inputSchema(updateUserRoleSchema)
  .action(({ parsedInput: { userId, ...body } }) => {
    return send('POST', `/users/${userId}/roles`, body);
  });

export const removeUserRoleAction = actionClient
  .inputSchema(updateUserRoleSchema)
  .action(({ parsedInput: { userId, ...body } }) => {
    return send('DELETE', `/users/${userId}/roles`, body);
  });
