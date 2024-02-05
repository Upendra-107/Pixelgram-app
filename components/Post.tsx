// Post.tsx
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import Timestamp from "./TimeStamp";
import { Card } from "./ui/card";
import PostOptions from "./PostOptions";
import PostActions from "./PostActions";

function Post({ post }: { post: any }) {
  const { id, user, createdAt, fileUrl, caption } = post;
  const { id: userId, username } = user;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">•</span>
              <Timestamp createdAt={createdAt} />
            </p>
            <p className="text-xs text-black dark:text-white font-medium">
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>
        <PostOptions post={post} userId={userId} />
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image src={fileUrl} alt="Post Image" fill className="sm:rounded-md object-cover" />
      </Card>
      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

      {caption && (
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
          <Link href={`/dashboard/${username}`} className="font-bold">
            {username}
          </Link>
          <p>{caption}</p>
        </div>
      )}

      <Comments postId={id} user={user} />
    </div>
  );
}

export default Post;
