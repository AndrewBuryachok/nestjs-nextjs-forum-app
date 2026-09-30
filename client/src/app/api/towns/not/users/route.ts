import { BaseUser } from '@/features/users/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<BaseUser>('/towns/not/users');
  return Response.json(res);
}
