import { z } from 'zod';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export const createGoodSchema = z.object({
  shopId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  price: z.number().int().min(1),
});

export type CreateGoodType = z.infer<typeof createGoodSchema>;

export const editGoodSchema = z.object({
  goodId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  price: z.number().int().min(1),
});

export type EditGoodType = z.infer<typeof editGoodSchema>;

export const deleteGoodSchema = z.object({
  goodId: z.number().int().min(1),
});

export type DeleteGoodType = z.infer<typeof deleteGoodSchema>;
