import { BaseShop } from '@/features/shops/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<BaseShop>('/shops/my/select');
  return Response.json(res);
}
