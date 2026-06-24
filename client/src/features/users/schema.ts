import { z } from 'zod';
import { Role } from '@/constants/roles';

export const editMyProfileSchema = z.object({
  avatar: z.string().min(3).max(16).or(z.literal('')),
});

export type EditMyProfileType = z.infer<typeof editMyProfileSchema>;

export const editUserProfileSchema = editMyProfileSchema.extend({
  userId: z.number().int().min(1),
});

export type EditUserProfileType = z.infer<typeof editUserProfileSchema>;

export const changeMyPasswordSchema = z.object({
  oldPassword: z.string().min(8).max(32),
  newPassword: z.string().min(8).max(32),
});

export type ChangeMyPasswordType = z.infer<typeof changeMyPasswordSchema>;

export const changeUserPasswordSchema = z.object({
  userId: z.number().int().min(1),
  password: z.string().min(8).max(32),
});

export type ChangeUserPasswordType = z.infer<typeof changeUserPasswordSchema>;

export const updateUserRoleSchema = z.object({
  userId: z.number().int().min(1),
  role: z.enum(Role),
});

export type UpdateUserRoleType = z.infer<typeof updateUserRoleSchema>;
