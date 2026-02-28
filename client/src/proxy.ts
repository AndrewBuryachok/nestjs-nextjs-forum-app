import xior from 'xior';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PAGE_TABS_MAP } from './config/navigation';
import { canAccess } from './lib/can-access';
import { decrypt, encrypt, sessionOptions } from './lib/session';
import { accessTokenOptions, refreshTokenOptions } from './lib/tokens';
import { Tokens } from './types/tokens';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const accessCookie = request.cookies.get('access')?.value;
  const refreshCookie = request.cookies.get('refresh')?.value;
  const sessionCookie = request.cookies.get('session')?.value;
  let session = sessionCookie ? await decrypt(sessionCookie) : null;
  if (!accessCookie && refreshCookie) {
    try {
      const res = await xior.post<Tokens>('/auth/refresh', null, {
        baseURL: process.env.API_URL,
        headers: { Authorization: `Bearer ${refreshCookie}` },
      });
      session = { user: res.data.user };
      const payload = await encrypt(session);
      response.cookies.set('session', payload, sessionOptions);
      response.cookies.set('access', res.data.access, accessTokenOptions);
      response.cookies.set('refresh', res.data.refresh, refreshTokenOptions);
    } catch (error) {
      response.cookies.delete('session');
      response.cookies.delete('access');
      response.cookies.delete('refresh');
    }
  }
  const pathname = request.nextUrl.pathname;
  const page = pathname.split('/')[1];
  const tab = pathname.split('/')[2];
  for (const [pageKey, pageValue] of Object.entries(PAGE_TABS_MAP)) {
    for (const [tabKey, tabValue] of Object.entries(pageValue)) {
      if (pageKey === page && tabKey === tab) {
        const roles = 'roles' in tabValue ? tabValue.roles : [];
        if (!canAccess(roles, session?.user.roles)) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
