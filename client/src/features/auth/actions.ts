'use server';

import { authSchema, AuthType } from './schema';
import { actionClient } from '@/lib/safe-action';
import { send } from '@/lib/api';
import { clearTokens, setTokens } from '@/lib/tokens';
import { Tokens } from '@/types/tokens';

export const registerAction = actionClient
  .inputSchema(authSchema)
  .action(async ({ parsedInput: body }) => {
    const res = await send<AuthType, Tokens>('POST', '/auth/register', body);
    if (res.ok && res.data) {
      await setTokens(res.data.access, res.data.refresh);
    }
    return res;
  });

export const loginAction = actionClient
  .inputSchema(authSchema)
  .action(async ({ parsedInput: body }) => {
    const res = await send<AuthType, Tokens>('POST', '/auth/login', body);
    if (res.ok && res.data) {
      await setTokens(res.data.access, res.data.refresh);
    }
    return res;
  });

export const logoutAction = actionClient.action(async () => {
  const res = await send('POST', '/auth/logout');
  if (res.ok) {
    await clearTokens();
  }
  return res;
});
