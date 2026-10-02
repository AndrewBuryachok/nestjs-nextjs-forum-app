import { z } from 'zod';
import { World } from '@/constants/worlds';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

export const createPlotSchema = z.object({
  cardId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
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
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
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
