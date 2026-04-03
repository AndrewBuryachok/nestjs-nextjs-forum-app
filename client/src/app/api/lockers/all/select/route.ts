import { BaseLocker } from '@/features/lockers/types';
import { select } from '@/lib/api';

export async function GET(req: Request) {
  const res = await select<BaseLocker>('/lockers/all/select');
  return Response.json(res);
}
