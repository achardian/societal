import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const PostMenu = ({
  authorId,
  postId,
}: {
  authorId: string;
  postId: string;
}) => {
  const { data: session } = useSession();

  if (session?.user.id !== authorId) return null;

  const deletePost = async () => {
    try {
      const { data } = await axios.delete(`/api/posts/${postId}`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Delete this post");
      queryClient.invalidateQueries("posts");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href="/edit-post"
            className="p-3 flex items-center justify-center w-full gap-3"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => mutateAsync()}
            variant="ghost"
            className="py-1 w-full flex items-center gap-3"
          >
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
