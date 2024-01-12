import * as z from "zod";

export const ProfileSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().max(300).optional(),
  location: z.string().optional(),
  job: z.string().optional(),
  website: z.string().optional(),
  image: z.string().optional(),
});

export type TProfileSchema = z.infer<typeof ProfileSchema>;
