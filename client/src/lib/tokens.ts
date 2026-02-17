import 'server-only';
import { cookies } from 'next/headers';

export const accessTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 15 * 60,
  path: '/',
};

export const refreshTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60,
  path: '/',
};

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('access')?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get('refresh')?.value;
}

export async function setTokens(access: string, refresh: string) {
  const cookieStore = await cookies();
  cookieStore.set('access', access, accessTokenOptions);
  cookieStore.set('refresh', refresh, refreshTokenOptions);
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete('access');
  cookieStore.delete('refresh');
}
