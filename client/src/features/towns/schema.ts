import { z } from 'zod';
import { World } from '@/constants/worlds';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

export const createTownSchema = z.object({
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type CreateTownType = z.infer<typeof createTownSchema>;

export const createTownWithUserSchema = createTownSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateTownWithUserType = z.infer<typeof createTownWithUserSchema>;

export const editTownSchema = z.object({
  townId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type EditTownType = z.infer<typeof editTownSchema>;

export const deleteTownSchema = z.object({
  townId: z.number().int().min(1),
});

export type DeleteTownType = z.infer<typeof deleteTownSchema>;

export const updateTownUserSchema = z.object({
  townId: z.number().int().min(1),
  userId: z.number().int().min(1),
});

export type UpdateTownUserType = z.infer<typeof updateTownUserSchema>;
