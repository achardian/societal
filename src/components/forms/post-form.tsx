"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { PostSchema, TPostSchema } from "@/schema/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon, Smile, VideoIcon } from "lucide-react";
import { useState } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import FileUploader from "../file-uploader";
import { MediaType } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";

const PostForm = () => {
  const { theme } = useTheme();
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [media, setMedia] = useState<{ isOpen: boolean; type: MediaType }>({
    isOpen: false,
    type: "TEXT",
  });

  const form = useForm<TPostSchema>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      mediaUrl: "",
      mediaType: "TEXT",
    },
  });

  const { isSubmitting } = form.formState;

  const handleEmoji = (data: EmojiClickData) => {
    const addemoji = `${form.getValues("content")}${data.emoji}`;
    form.setValue("content", addemoji);
  };

  const handleMediaType = (type: MediaType) => {
    if (media.type === type) {
      setMedia({ type: "TEXT", isOpen: false });
    } else {
      setMedia({ type, isOpen: true });
    }
  };

  const onSubmit = async (values: TPostSchema) => {
    if (!form.getValues("mediaUrl") && media.type !== "TEXT") {
      setMedia({ type: "TEXT", isOpen: false });
    }

    try {
      await axios.post("/api/posts", values);
      toast.success("Created new post!");
      form.reset();
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="What's on your mind?" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setEmojiOpen((prev) => !prev);
            }}
            className="relative text-yellow-500 hover:bg-yellow-300/20 p-2 rounded-full"
          >
            <Smile className="h-5 w-5" />
            {emojiOpen && (
              <div className="absolute top-10 left-0 z-40">
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  theme={theme as Theme}
                />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleMediaType("IMAGE")}
            className="text-sky-600 hover:bg-sky-300/20 p-2 rounded-full"
          >
            <ImageIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => handleMediaType("VIDEO")}
            className="text-rose-600 hover:bg-rose-300/20 p-2 rounded-full"
          >
            <VideoIcon className="h-5 w-5" />
          </button>
        </div>

        {media.type !== "TEXT" && (
          <FormField
            name="mediaUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl {...field}>
                  <FileUploader
                    mediaType={media.type}
                    onChange={field.onChange}
                    form={form}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button
          disabled={isSubmitting}
          type="submit"
          className="ml-auto text-white"
        >
          Publish
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
