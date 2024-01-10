import * as z from "zod";

export const PostSchema = z.object({
  content: z
    .string()
    .min(1)
    .max(300, { message: "Post must not be longer than 300 characters" }),
  mediaUrl: z.string().optional(),
  mediaType: z.string(),
});

export type TPostSchema = z.infer<typeof PostSchema>;
