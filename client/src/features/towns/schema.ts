import { z } from 'zod';
import { World } from '@/constants/worlds';

export const createTownSchema = z.object({
  name: z.string().min(1).max(16),
  world: z.enum(World),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
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
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
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
