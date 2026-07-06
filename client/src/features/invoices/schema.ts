import { z } from 'zod';

export const createInvoiceSchema = z.object({
  senderCardId: z.number().int().min(1),
  receiverUserId: z.number().int().min(1),
  sum: z.number().int().min(1),
  description: z.string().max(32),
});

export type CreateInvoiceType = z.infer<typeof createInvoiceSchema>;

export const createInvoiceWithUserSchema = createInvoiceSchema.extend({
  senderUserId: z.number().int().min(1),
});

export type CreateInvoiceWithUserType = z.infer<
  typeof createInvoiceWithUserSchema
>;

export const editInvoiceSchema = z.object({
  invoiceId: z.number().int().min(1),
  sum: z.number().int().min(1),
  description: z.string().max(32),
});

export type EditInvoiceType = z.infer<typeof editInvoiceSchema>;

export const deleteInvoiceSchema = z.object({
  invoiceId: z.number().int().min(1),
});

export type DeleteInvoiceType = z.infer<typeof deleteInvoiceSchema>;

export const payInvoiceSchema = z.object({
  invoiceId: z.number().int().min(1),
  cardId: z.number().int().min(1),
});

export type PayInvoiceType = z.infer<typeof payInvoiceSchema>;
