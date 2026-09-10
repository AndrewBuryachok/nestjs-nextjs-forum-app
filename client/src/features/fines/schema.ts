import { z } from 'zod';

export const createFineSchema = z.object({
  senderCardId: z.number().int().min(1),
  receiverUserId: z.number().int().min(1),
  sum: z.number().int().min(1),
  description: z.string().max(32),
});

export type CreateFineType = z.infer<typeof createFineSchema>;

export const createFineWithUserSchema = createFineSchema.extend({
  senderUserId: z.number().int().min(1),
});

export type CreateFineWithUserType = z.infer<typeof createFineWithUserSchema>;

export const editFineSchema = z.object({
  fineId: z.number().int().min(1),
  sum: z.number().int().min(1),
  description: z.string().max(32),
});

export type EditFineType = z.infer<typeof editFineSchema>;

export const deleteFineSchema = z.object({
  fineId: z.number().int().min(1),
});

export type DeleteFineType = z.infer<typeof deleteFineSchema>;

export const payFineSchema = z.object({
  fineId: z.number().int().min(1),
  cardId: z.number().int().min(1),
});

export type PayFineType = z.infer<typeof payFineSchema>;
