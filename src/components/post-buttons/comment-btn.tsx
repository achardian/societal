import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { CommentWithAuthor } from "@/types";
import OvalLoader from "../oval-loader";
import CommentForm from "../forms/comment-form";
import Comment from "../comment";

const CommentBtn = ({
  postId,
  comments,
}: {
  postId: string;
  comments: number;
}) => {
  const { data: session } = useSession();
  const [commentsCount, setCommentsCount] = useState(comments);

  const handleClick = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}/comments`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const setCommentText = (comments: number) => {
    if (commentsCount === 1) {
      return "1 Comment";
    } else if (commentsCount > 1) {
      return `${comments} Comments`;
    } else {
      return "Comment";
    }
  };

  const { data, isFetching, refetch, remove } = useQuery({
    queryKey: ["comments"],
    queryFn: handleClick,
  });

  return (
    <Sheet onOpenChange={() => remove()}>
      <SheetTrigger>
        <button
          onClick={() => refetch()}
          className="p-1 rounded-full flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4 hover:text-sky-600 text-gray-500" />
          <span className="text-[12px] text-gray-500">
            {commentsCount > 0 && commentsCount}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{setCommentText(commentsCount)}</SheetTitle>
        </SheetHeader>

        <div>
          <div className="flex items-center gap-2 my-5">
            <div className="relative h-10 w-10 rounded-full overflow-clip">
              <Image src={session?.user.image || ""} alt="user-img" fill />
            </div>
            <span>{session?.user.name}</span>
          </div>

          <CommentForm postId={postId} setCommentsCount={setCommentsCount} />

          <Separator className="my-5" />

          <div>
            {isFetching && <OvalLoader />}

            {data?.length === 0 && !isFetching && (
              <span className="text-center font-medium">
                There is no comment yet!
              </span>
            )}

            {data &&
              data?.map((comment: CommentWithAuthor) => (
                <Comment key={comment.id} comment={comment} />
              ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentBtn;
