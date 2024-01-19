import PostForm from "@/components/forms/post-form";
import db from "@/lib/db";
import { Post } from "@prisma/client";

const getPostDetail = async (postId: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    return error;
  }
};
const Page = async ({ params }: { params: { postId: string } }) => {
  const post = (await getPostDetail(params.postId)) as Post;

  return (
    <div className="p-3">
      <PostForm post={post} />
    </div>
  );
};

export default Page;
