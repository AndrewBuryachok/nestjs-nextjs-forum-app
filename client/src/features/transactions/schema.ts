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

export const createTransferSchema = z.object({
  senderCardId: z.number().int().min(1),
  receiverCardId: z.number().int().min(1),
  sum: z.number().int().min(1),
  description: z.string().max(32),
});

export type CreateTransferType = z.infer<typeof createTransferSchema>;

export const createTransferWithReceiverSchema = createTransferSchema.extend({
  receiverUserId: z.number().int().min(1),
});

export type CreateTransferWithReceiverType = z.infer<
  typeof createTransferWithReceiverSchema
>;

export const createTransferWithSenderSchema =
  createTransferWithReceiverSchema.extend({
    senderUserId: z.number().int().min(1),
  });

export type CreateTransferWithSenderType = z.infer<
  typeof createTransferWithSenderSchema
>;
