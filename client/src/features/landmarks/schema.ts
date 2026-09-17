import { z } from 'zod';
import { World } from '@/constants/worlds';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

export const createLandmarkSchema = z.object({
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type CreateLandmarkType = z.infer<typeof createLandmarkSchema>;

export const createLandmarkWithUserSchema = createLandmarkSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateLandmarkWithUserType = z.infer<
  typeof createLandmarkWithUserSchema
>;
