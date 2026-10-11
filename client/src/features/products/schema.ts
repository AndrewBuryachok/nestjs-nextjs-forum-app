import { z } from 'zod';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export const createProductSchema = z.object({
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  price: z.number().int().min(1),
});

export type CreateProductType = z.infer<typeof createProductSchema>;

export const createProductWithShopSchema = createProductSchema.extend({
  shopId: z.number().int().min(1),
});

export type CreateProductWithShopType = z.infer<
  typeof createProductWithShopSchema
>;

export const createProductWithShopAndUserSchema =
  createProductWithShopSchema.extend({
    userId: z.number().int().min(1),
  });

export type CreateProductWithShopAndUserType = z.infer<
  typeof createProductWithShopAndUserSchema
>;

export const createProductWithRentSchema = createProductSchema.extend({
  rentId: z.number().int().min(1),
});

export type CreateProductWithRentType = z.infer<
  typeof createProductWithRentSchema
>;

export const createProductWithRentAndUserSchema =
  createProductWithRentSchema.extend({
    userId: z.number().int().min(1),
  });

export type CreateProductWithRentAndUserType = z.infer<
  typeof createProductWithRentAndUserSchema
>;

export const editProductSchema = z.object({
  productId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  price: z.number().int().min(1),
});

export type EditProductType = z.infer<typeof editProductSchema>;

export const deleteProductSchema = z.object({
  productId: z.number().int().min(1),
});

export type DeleteProductType = z.infer<typeof deleteProductSchema>;
