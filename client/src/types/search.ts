import { z } from 'zod';

export const searchSchema = z.object({
  id: z.number().int().min(1).optional(),
});

export type SearchType = z.infer<typeof searchSchema>;
