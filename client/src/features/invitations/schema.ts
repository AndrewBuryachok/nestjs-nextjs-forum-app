import { z } from 'zod';

export const createInvitationSchema = z.object({
  userId: z.number().int().min(1),
});

export type CreateInvitationType = z.infer<typeof createInvitationSchema>;
