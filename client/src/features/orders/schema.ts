import { z } from 'zod';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export const createOrderSchema = z.object({
  lockerId: z.number().int().min(1),
  cardId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  sum: z.number().int().min(1),
});

export type CreateOrderType = z.infer<typeof createOrderSchema>;

export const editOrderSchema = z.object({
  orderId: z.number().int().min(1),
  item: z.enum(Item),
  description: z.string().max(32),
  amount: z.number().int().min(1).max(27),
  batch: z.number().int().min(1).max(64),
  unit: z.enum(Unit),
  sum: z.number().int().min(1),
});

export type EditOrderType = z.infer<typeof editOrderSchema>;

export const deleteOrderSchema = z.object({
  orderId: z.number().int().min(1),
});

export type DeleteOrderType = z.infer<typeof deleteOrderSchema>;
