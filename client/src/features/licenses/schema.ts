import { z } from 'zod';

export const updateLicenseSchema = z.object({
  userId: z.number().int().min(1),
});

export type UpdateLicenseType = z.infer<typeof updateLicenseSchema>;
