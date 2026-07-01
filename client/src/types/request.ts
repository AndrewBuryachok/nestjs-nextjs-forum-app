import { z } from 'zod';

export const requestSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  id: z.coerce.number().int().min(1).optional().catch(undefined),
  user: z.coerce.number().int().min(1).optional().catch(undefined),
});

export type Request = z.infer<typeof requestSchema>;
