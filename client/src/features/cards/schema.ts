import { z } from 'zod';

export const createCardSchema = z.object({
  name: z.string().min(1).max(16),
});

export type CreateCardType = z.infer<typeof createCardSchema>;

export const createCardWithUserSchema = createCardSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateCardWithUserType = z.infer<typeof createCardWithUserSchema>;

export const editCardSchema = z.object({
  cardId: z.number().int().min(1),
  name: z.string().min(1).max(16),
});

export type EditCardType = z.infer<typeof editCardSchema>;

export const deleteCardSchema = z.object({
  cardId: z.number().int().min(1),
});

export type DeleteCardType = z.infer<typeof deleteCardSchema>;

export const updateCardUserSchema = z.object({
  cardId: z.number().int().min(1),
  userId: z.number().int().min(1),
});

export type UpdateCardUserType = z.infer<typeof updateCardUserSchema>;
