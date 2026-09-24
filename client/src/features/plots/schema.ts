import { z } from 'zod';

export const createPlotSchema = z.object({
  cardId: z.number().int().min(1),
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

export const editPlotSchema = z.object({
  plotId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
  price: z.number().int().min(1),
});

export type EditPlotType = z.infer<typeof editPlotSchema>;

export const deletePlotSchema = z.object({
  plotId: z.number().int().min(1),
});

export type DeletePlotType = z.infer<typeof deletePlotSchema>;

export const reservePlotSchema = z.object({
  plotId: z.number().int().min(1),
  cardId: z.number().int().min(1),
});

export type ReservePlotType = z.infer<typeof reservePlotSchema>;

export const reservePlotWithUserSchema = reservePlotSchema.extend({
  userId: z.number().int().min(1),
});

export type ReservePlotWithUserType = z.infer<typeof reservePlotWithUserSchema>;
