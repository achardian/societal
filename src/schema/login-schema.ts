import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
