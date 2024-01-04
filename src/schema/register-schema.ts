import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .max(25, { message: "Name must not be longer than 25 characters." }),
    username: z
      .string()
      .max(15, { message: "Name must not be longer than 15 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Name must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Name must be at least 8 characters." }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Confirmation password must match password.",
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
