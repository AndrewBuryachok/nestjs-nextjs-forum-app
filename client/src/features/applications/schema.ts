import { z } from 'zod';

export const createOrDeleteApplicationSchema = z.object({
  townId: z.number().int().min(1),
});

export type CreateOrDeleteApplicationType = z.infer<
  typeof createOrDeleteApplicationSchema
>;

export const acceptOrRejectApplicationSchema = z.object({
  userId: z.number().int().min(1),
});

export type AcceptOrRejectApplicationType = z.infer<
  typeof acceptOrRejectApplicationSchema
>;
