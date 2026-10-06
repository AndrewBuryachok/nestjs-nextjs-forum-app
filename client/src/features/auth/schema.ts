import { z } from 'zod';

export const authSchema = z.object({
  nick: z.string().min(3).max(16).regex(/^\w+$/),
  password: z.string().min(6).max(32),
});

export type AuthType = z.infer<typeof authSchema>;
