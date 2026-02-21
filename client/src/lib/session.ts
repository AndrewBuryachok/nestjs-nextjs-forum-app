import 'server-only';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { BaseUser } from '@/features/users/types';

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

type SessionPayload = {
  user: BaseUser;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export const sessionOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60,
  path: '/',
};

export async function createSession(user: BaseUser) {
  const cookieStore = await cookies();
  const session = await encrypt({ user });
  cookieStore.set('session', session, sessionOptions);
}

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  return session ? decrypt(session) : null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
