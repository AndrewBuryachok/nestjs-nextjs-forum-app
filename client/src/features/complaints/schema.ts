import { z } from 'zod';

export const createComplaintSchema = z.object({
  title: z.string().min(1).max(32),
});

export type CreateComplaintType = z.infer<typeof createComplaintSchema>;

export const createComplaintWithReceiverSchema = createComplaintSchema.extend({
  receiverUserId: z.number().int().min(1),
});

export type CreateComplaintWithReceiverType = z.infer<
  typeof createComplaintWithReceiverSchema
>;

export const createComplaintWithSenderSchema =
  createComplaintWithReceiverSchema.extend({
    senderUserId: z.number().int().min(1),
  });

export type CreateComplaintWithSenderType = z.infer<
  typeof createComplaintWithSenderSchema
>;
