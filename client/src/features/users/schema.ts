import { z } from 'zod';
import { Role } from '@/constants/roles';

export const updateUserRoleSchema = z.object({
  userId: z.number().int().min(1),
  role: z.enum(Role),
});

export type UpdateUserRoleType = z.infer<typeof updateUserRoleSchema>;
