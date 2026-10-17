import { z } from 'zod';

export const createOrDeleteInvitationSchema = z.object({
  userId: z.number().int().min(1),
});

export type CreateOrDeleteInvitationType = z.infer<
  typeof createOrDeleteInvitationSchema
>;

export const acceptOrRejectInvitationSchema = z.object({
  townId: z.number().int().min(1),
});

export type AcceptOrRejectInvitationType = z.infer<
  typeof acceptOrRejectInvitationSchema
>;
