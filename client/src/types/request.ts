import { z } from 'zod';

export const requestSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
});

export type Request = z.infer<typeof requestSchema>;
