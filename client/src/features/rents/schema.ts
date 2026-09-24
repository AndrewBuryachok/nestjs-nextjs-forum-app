import { z } from 'zod';

export const continueRentSchema = z.object({
  rentId: z.number().int().min(1),
});

export type ContinueRentType = z.infer<typeof continueRentSchema>;

export const completeRentSchema = z.object({
  rentId: z.number().int().min(1),
});

export type CompleteRentType = z.infer<typeof completeRentSchema>;
