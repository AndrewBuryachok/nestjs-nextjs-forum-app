import { z } from 'zod';

export const createTransactionSchema = z.object({
  cardId: z.number().int().min(1),
  sum: z.number().int().min(1),
});

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;

export const createTransactionWithUserSchema = createTransactionSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateTransactionWithUserType = z.infer<
  typeof createTransactionWithUserSchema
>;
