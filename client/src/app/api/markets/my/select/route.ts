import { BaseMarket } from '@/features/markets/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<BaseMarket>('/markets/my/select');
  return Response.json(res);
}
