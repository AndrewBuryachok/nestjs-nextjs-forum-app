import { z } from 'zod';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export const createProductSchema = z.object({
  shopId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  price: z.number().int().min(1),
});

export type CreateProductType = z.infer<typeof createProductSchema>;

export const createProductWithUserSchema = createProductSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateProductWithUserType = z.infer<
  typeof createProductWithUserSchema
>;

export const editProductSchema = z.object({
  productId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  price: z.number().int().min(1),
});

export type EditProductType = z.infer<typeof editProductSchema>;

export const deleteProductSchema = z.object({
  productId: z.number().int().min(1),
});

export type DeleteProductType = z.infer<typeof deleteProductSchema>;

export const buyProductSchema = z.object({
  productId: z.number().int().min(1),
  cardId: z.number().int().min(1),
  amount: z.number().int().min(1).max(27),
});

export type BuyProductType = z.infer<typeof buyProductSchema>;

export const buyProductWithUserSchema = buyProductSchema.extend({
  userId: z.number().int().min(1),
});

export type BuyProductWithUserType = z.infer<typeof buyProductWithUserSchema>;
