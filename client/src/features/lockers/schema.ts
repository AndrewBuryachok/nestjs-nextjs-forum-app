import { z } from 'zod';
import { World } from '@/constants/worlds';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '@/constants/place';

export const createLockerSchema = z.object({
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type CreateLockerType = z.infer<typeof createLockerSchema>;

export const createLockerWithUserSchema = createLockerSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateLockerWithUserType = z.infer<
  typeof createLockerWithUserSchema
>;

export const editLockerSchema = z.object({
  lockerId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(PLACE_X_MIN).max(PLACE_X_MAX),
  y: z.number().int().min(PLACE_Y_MIN).max(PLACE_Y_MAX),
});

export type EditLockerType = z.infer<typeof editLockerSchema>;

export const deleteLockerSchema = z.object({
  lockerId: z.number().int().min(1),
});

export type DeleteLockerType = z.infer<typeof deleteLockerSchema>;
