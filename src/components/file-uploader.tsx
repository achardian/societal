"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { TPostSchema } from "@/schema/post-schema";
import { MediaType } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import ReactPlayer from "react-player/lazy";

type TFileUploader = {
  mediaType: MediaType;
  onChange: (state: string) => void;
  form: UseFormReturn<TPostSchema>;
};

const FileUploader = ({ mediaType, onChange, form }: TFileUploader) => {
  const mediaUrl = form.getValues("mediaUrl");

  return (
    <div className="relative w-full min-h-[200px]">
      {!mediaUrl && (
        <UploadDropzone
          endpoint={mediaType === "IMAGE" ? "imageUploader" : "videoUploader"}
          onClientUploadComplete={(res) => {
            onChange(res[0].url);
            form.setValue("mediaType", mediaType);
          }}
        />
      )}

      {mediaUrl && mediaType === "IMAGE" && (
        <Image
          src={mediaUrl}
          alt="post-image"
          fill
          className="object-contain"
        />
      )}

      {mediaUrl && mediaType === "VIDEO" && (
        <ReactPlayer url={mediaUrl} controls width="100%" />
      )}

      {mediaUrl && (
        <button
          onClick={() => {
            form.setValue("mediaType", "TEXT");
            form.setValue("mediaUrl", "");
          }}
          className="p-2 absolute top-2 right-2 rounded-full bg-rose-600 hover:bg-rose-500"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default FileUploader;
