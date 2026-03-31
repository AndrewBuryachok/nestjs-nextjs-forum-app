import { z } from 'zod';

export const deletePurchaseSchema = z.object({
  purchaseId: z.number().int().min(1),
});

export type DeletePurchaseType = z.infer<typeof deletePurchaseSchema>;
