import { z } from 'zod';

export const createTownSchema = z.object({
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
});

export type CreateTownType = z.infer<typeof createTownSchema>;

export const createTownWithUserSchema = createTownSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateTownWithUserType = z.infer<typeof createTownWithUserSchema>;
