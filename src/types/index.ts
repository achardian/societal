import { Comment, Post, User } from "@prisma/client";

export type PostWithAuthorAndComment = Post & {
  author: User;
  comments: Comment[];
};

export type CommentWithAuthor = Comment & {
  author: User;
};
