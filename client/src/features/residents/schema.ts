import { z } from 'zod';

export const deleteResidentSchema = z.object({
  userId: z.number().int().min(1),
});

export type DeleteResidentType = z.infer<typeof deleteResidentSchema>;
