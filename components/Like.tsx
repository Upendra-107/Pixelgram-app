// LikeButton.tsx
"use client";
import { useState } from "react";
import ActionIcon from "./ActionIcon";
import { Heart } from "lucide-react";

type LikeButtonProps = {
  post: {
    id: string;
    likes: (string | number)[];

  };
  userId?: string;
};

function LikeButton({ post, userId }: LikeButtonProps) {
  const [likes, setLikes] = useState(post.likes);
  const isLiked = userId && likes.includes(userId);

  const toggleLike = () => {
    const updatedLikes = isLiked
      ? likes.filter((id) => id !== userId)
      : userId
      ? [...likes, userId]
      : likes;

    // Update likes directly in the userData.json structure
    post.likes = updatedLikes;
    setLikes(updatedLikes);
  };

  return (
    <div className="flex flex-col">
      <button type="button" onClick={toggleLike}>
        <ActionIcon postId={post.id}>
          <Heart
            className={`h-6 w-6 ${
              isLiked ? "text-red-500 fill-red-500" : ""
            }`}
          />
        </ActionIcon>
      </button>
      {likes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
}

export default LikeButton;
