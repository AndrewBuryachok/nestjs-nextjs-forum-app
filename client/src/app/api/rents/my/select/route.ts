import { BaseRent } from '@/features/rents/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<BaseRent>('/rents/my/select');
  return Response.json(res);
}
