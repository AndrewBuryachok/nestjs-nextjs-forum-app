import { z } from 'zod';

export const createLandmarkSchema = z.object({
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
});

export type CreateLandmarkType = z.infer<typeof createLandmarkSchema>;

export const createLandmarkWithUserSchema = createLandmarkSchema.extend({
  userId: z.number().int().min(1),
});

export type CreateLandmarkWithUserType = z.infer<
  typeof createLandmarkWithUserSchema
>;

export const editLandmarkSchema = z.object({
  landmarkId: z.number().int().min(1),
  name: z.string().min(1).max(16),
  x: z.number().int().min(-1000).max(1000),
  y: z.number().int().min(-1000).max(1000),
});

export type EditLandmarkType = z.infer<typeof editLandmarkSchema>;

export const deleteLandmarkSchema = z.object({
  landmarkId: z.number().int().min(1),
});

export type DeleteLandmarkType = z.infer<typeof deleteLandmarkSchema>;
