import { z } from 'zod';

export const searchSchema = z.object({
  id: z.number().int().min(1).optional(),
  user: z.number().int().min(0).optional(),
});

export type SearchType = z.infer<typeof searchSchema>;
