import { z } from 'zod';
import { Item } from '@/constants/items';

export const searchSchema = z.object({
  id: z.number().int().min(1).optional(),
  user: z.number().int().min(0).optional(),
  item: z.enum(Item).optional(),
});

export type SearchType = z.infer<typeof searchSchema>;
