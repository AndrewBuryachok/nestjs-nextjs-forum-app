import { BaseTown } from '@/features/towns/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<BaseTown>('/towns/all/select');
  return Response.json(res);
}
