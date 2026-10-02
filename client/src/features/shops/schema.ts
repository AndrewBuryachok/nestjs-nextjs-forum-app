import { z } from 'zod';
import { World } from '@/constants/worlds';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

export const createShopSchema = z.object({
  cardId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type CreateShopType = z.infer<typeof createShopSchema>;

export const createShopWithUserSchema = createShopSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateShopWithUserType = z.infer<typeof createShopWithUserSchema>;

export const editShopSchema = z.object({
  shopId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type EditShopType = z.infer<typeof editShopSchema>;

export const deleteShopSchema = z.object({
  shopId: z.number().int().min(1),
});

export type DeleteShopType = z.infer<typeof deleteShopSchema>;
