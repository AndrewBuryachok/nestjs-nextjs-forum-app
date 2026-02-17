import { z } from 'zod';

export const createTransactionSchema = z.object({
  cardId: z.number().int().min(1),
  sum: z.number().int().min(1),
});

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;

export const createTransferSchema = z.object({
  senderCardId: z.number().int().min(1),
  receiverCardId: z.number().int().min(1),
  sum: z.number().int().min(1),
  description: z.string().max(32),
});

export type CreateTransferType = z.infer<typeof createTransferSchema>;

export const deleteTransactionSchema = z.object({
  transactionId: z.number().int().min(1),
});

export type DeleteTransactionType = z.infer<typeof deleteTransactionSchema>;
