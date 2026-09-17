import { z } from 'zod';
import { Item } from '@/constants/items';
import { Sort } from '@/constants/sorts';

export const requestSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  id: z.coerce.number().int().min(1).optional().catch(undefined),
  user: z.coerce.number().int().min(1).optional().catch(undefined),
  item: z.enum(Item).optional().catch(undefined),
  sort: z.enum(Sort).optional().catch(undefined),
});

export type Request = z.infer<typeof requestSchema>;
