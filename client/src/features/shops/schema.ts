import { z } from 'zod';

export const createShopSchema = z.object({
  cardId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
});

export type CreateShopType = z.infer<typeof createShopSchema>;

export const createShopWithUserSchema = createShopSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateShopWithUserType = z.infer<typeof createShopWithUserSchema>;
