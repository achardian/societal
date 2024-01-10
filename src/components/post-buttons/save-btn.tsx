import axios from "axios";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const SaveBtn = ({
  postId,
  saveIds,
}: {
  postId: string;
  saveIds: string[];
}) => {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(
    saveIds.includes(session?.user.id as string)
  );
  const router = useRouter();

  const savePost = async () => {
    try {
      const { data } = await axios.post(`/api/posts/${postId}/bookmarks`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const unsavePost = async () => {
    try {
      const { data } = await axios.delete(`/api/posts/${postId}/bookmarks`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: isSaved ? unsavePost : savePost,
    onMutate: () => {
      setIsSaved(isSaved ? false : true);
    },
    onSuccess: () => {
      isSaved
        ? toast.success("Remove from bookmarks")
        : toast.success("Saved this post");
      router.refresh();
    },
    onSettled: () => {
      setIsSaved(isSaved ? false : true);
    },
    onError: () => {
      toast.error("Failed to save this post");
    },
  });

  return (
    <button onClick={() => mutateAsync()}>
      <Bookmark
        className={cn(
          "h-4 w-4 text-gray-500 hover:text-yellow-400",
          isSaved ? "fill-yellow-400 text-yellow-400" : "fill-transparent"
        )}
      />
    </button>
  );
};

export default SaveBtn;
