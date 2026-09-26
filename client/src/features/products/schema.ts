import { z } from 'zod';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export const createProductSchema = z.object({
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
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

export const editProductAmountAndPriceSchema = z.object({
  productId: z.number().int().min(1),
  amount: z.number().int().min(1).max(27),
  price: z.number().int().min(1),
});

export type EditProductAmountAndPriceType = z.infer<
  typeof editProductAmountAndPriceSchema
>;

export const editProductSchema = editProductAmountAndPriceSchema.extend({
  item: z.enum(Item),
  description: z.string().max(32),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
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
