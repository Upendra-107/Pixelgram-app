// BookmarkButton.tsx
'use client'
import { useState } from "react";
import ActionIcon from "@/components/ActionIcon";
import { Bookmark } from "lucide-react";
import userData from "../data/userData.json"; // Adjust the path accordingly

type Props = {
  post: any; // Update the type according to your post structure
  userId?: string;
};

function BookmarkButton({ post, userId }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(
    post.savedBy?.some((bookmark: any) => bookmark.userId === userId) ?? false
  );

  const toggleBookmark = () => {
    const updatedBookmarks = isBookmarked
      ? post.savedBy?.filter((bookmark: any) => bookmark.userId !== userId) ?? []
      : [...(post.savedBy ?? []), { userId }];

    // Update the savedBy property directly in the userData.json structure
    post.savedBy = updatedBookmarks;
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button type="button" onClick={toggleBookmark} className="ml-auto">
      <ActionIcon>
        <Bookmark
          className={`h-6 w-6 ${isBookmarked ? "fill-black" : ""}`}
        />
      </ActionIcon>
    </button>
  );
}

export default BookmarkButton;
