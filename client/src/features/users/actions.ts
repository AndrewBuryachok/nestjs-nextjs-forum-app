'use server';

import {
  changeMyPasswordSchema,
  changeUserPasswordSchema,
  editMyProfileSchema,
  editUserProfileSchema,
  updateUserRoleSchema,
} from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';
import { createSession, verifySession } from '@/lib/session';

export const editMyProfileAction = actionClient
  .inputSchema(editMyProfileSchema)
  .action(async ({ parsedInput: body }) => {
    const res = await send('PATCH', '/users/me/profile', body);
    if (res.ok) {
      const session = await verifySession();
      if (session) {
        await createSession({ ...session.user, avatar: body.avatar });
      }
    }
    return res;
  });

export const editUserProfileAction = actionClient
  .inputSchema(editUserProfileSchema)
  .action(({ parsedInput: { userId, ...body } }) => {
    return send('PATCH', `/users/${userId}/profile`, body);
  });

export const changeMyPasswordAction = actionClient
  .inputSchema(changeMyPasswordSchema)
  .action(({ parsedInput: body }) => {
    return send('PATCH', '/users/me/password', body);
  });

export const changeUserPasswordAction = actionClient
  .inputSchema(changeUserPasswordSchema)
  .action(({ parsedInput: { userId, ...body } }) => {
    return send('PATCH', `/users/${userId}/password`, body);
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
