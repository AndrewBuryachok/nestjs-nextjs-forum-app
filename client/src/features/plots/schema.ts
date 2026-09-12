import { z } from 'zod';

export const createPlotSchema = z.object({
  marketId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
  price: z.number().int().min(1),
});

export type CreatePlotType = z.infer<typeof createPlotSchema>;

export const createPlotWithUserSchema = createPlotSchema.extend({
  userId: z.number().int().min(1),
});

export type CreatePlotWithUserType = z.infer<typeof createPlotWithUserSchema>;
