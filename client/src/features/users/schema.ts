import { z } from 'zod';
import { Role } from '@/constants/roles';

export const editUserProfileSchema = z.object({
  userId: z.number().int().min(1),
  avatar: z.string().min(3).max(16).or(z.literal('')),
});

export type EditUserProfileType = z.infer<typeof editUserProfileSchema>;

export const updateUserRoleSchema = z.object({
  userId: z.number().int().min(1),
  role: z.enum(Role),
});

export type UpdateUserRoleType = z.infer<typeof updateUserRoleSchema>;
