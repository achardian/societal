import Image from "next/image";
import Link from "next/link";

import { convertDate } from "@/lib/utils";
import { CommentWithAuthor } from "@/types";
import ProfileImg from "./profile-img";

const Comment = ({ comment }: { comment: CommentWithAuthor }) => {
  return (
    <div key={comment.id} className="my-3">
      <div className="flex items-center gap-2">
        <Link href={`/profile/${comment.author.username}`}>
          <ProfileImg
            src={comment.author.image as string}
            className="h-9 w-9"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/profile/${comment.author.username}`}
            className="text-[15px] font-semibold"
          >
            {comment.author.name}
          </Link>
          <small className="text-gray-500">
            {convertDate(comment.createdAt)}
          </small>
        </div>
      </div>
      <div className="border-b py-2">{comment.body}</div>
    </div>
  );
};

export default Comment;
