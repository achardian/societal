"use client";

import { CommentSchema, TCommentSchema } from "@/schema/comment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommentForm = ({
  postId,
  setCommentsCount,
}: {
  postId: string;
  setCommentsCount: Dispatch<SetStateAction<number>>;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<TCommentSchema>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      body: "",
    },
  });
  const { isSubmitting } = form.formState;

  const addComment = async (values: TCommentSchema) => {
    try {
      const { data } = await axios.post(
        `/api/posts/${postId}/comments`,
        values
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      setCommentsCount((prev) => prev + 1);
    },
    onError: () => {
      toast.error("Failed to add comment");
      setCommentsCount((prev) => prev - 1);
    },
  });

  const onSubmit = (values: TCommentSchema) => {
    mutateAsync(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Write a comment here..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          className="text-white font-semibold ml-auto"
        >
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
