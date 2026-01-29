import { SelectCardWithBalance } from '@/features/cards/types';
import { select } from '@/lib/api';
import { idSchema } from '@/types/id';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function GET(req: Request, props: Props) {
  const params = await props.params;
  const result = idSchema.safeParse(params);
  if (!result.success) {
    return Response.json(result.error.flatten().fieldErrors, { status: 400 });
  }
  const id = result.data.id;
  const res = await select<SelectCardWithBalance>(
    `/cards/${id}/select-with-balance`,
  );
  return Response.json(res);
}
