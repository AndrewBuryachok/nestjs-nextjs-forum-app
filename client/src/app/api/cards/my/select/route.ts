import { SelectCardWithBalance } from '@/features/cards/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<SelectCardWithBalance>('/cards/my/select');
  return Response.json(res);
}
