import { z } from 'zod';

export const createApplicationSchema = z.object({
  townId: z.number().int().min(1),
});

export type CreateApplicationType = z.infer<typeof createApplicationSchema>;
