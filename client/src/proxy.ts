import xior from 'xior';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { accessTokenOptions, refreshTokenOptions } from './lib/tokens';
import { Tokens } from './types/tokens';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const accessCookie = request.cookies.get('access')?.value;
  const refreshCookie = request.cookies.get('refresh')?.value;
  if (!accessCookie && refreshCookie) {
    try {
      const res = await xior.post<Tokens>('/auth/refresh', null, {
        baseURL: process.env.API_URL,
        headers: { Authorization: `Bearer ${refreshCookie}` },
      });
      response.cookies.set('access', res.data.access, accessTokenOptions);
      response.cookies.set('refresh', res.data.refresh, refreshTokenOptions);
    } catch (error) {
      response.cookies.delete('access');
      response.cookies.delete('refresh');
    }
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
