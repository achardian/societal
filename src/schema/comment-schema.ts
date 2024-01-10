import * as z from "zod";

export const CommentSchema = z.object({
  body: z
    .string()
    .min(1)
    .max(200, { message: "Comment must not be longer than 200 characters." }),
});

export type TCommentSchema = z.infer<typeof CommentSchema>;
