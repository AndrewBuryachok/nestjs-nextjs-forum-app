import { z } from 'zod';

export const createLockerSchema = z.object({
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
});

export type CreateLockerType = z.infer<typeof createLockerSchema>;

export const createLockerWithUserSchema = createLockerSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateLockerWithUserType = z.infer<
  typeof createLockerWithUserSchema
>;
