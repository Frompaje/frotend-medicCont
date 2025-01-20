import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(255),
});

export type LoginSchema = z.infer<typeof loginSchema>;


export const createUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(3).max(255),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>;
