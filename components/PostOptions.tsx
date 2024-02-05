// PostOptions.tsx
'use client'
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SubmitButton from "@/components/SubmitButton";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import userData from "../data/userData.json"; // Adjust the path accordingly

type Props = {
  post: any; // Adjust the type as needed
  userId?: string;
  className?: string;
};

function deletePostById(postId: string) {
  const updatedUserData = userData.filter((post) => post.id !== postId);
  // Save the updated data back to the file or storage mechanism of your choice
  // For simplicity, you can overwrite the existing file, but in a real app, you'd use a proper database or storage solution
  // fs.writeFileSync('path-to-your-userData.json', JSON.stringify(updatedUserData, null, 2));
  return updatedUserData;
}

function PostOptions({ post, userId, className }: Props) {
  const isPostMine = post && post.user && post.user.id === userId;

  const handleDeletePost = async () => {
    if (!isPostMine) {
      return; // Avoid handling deletion for posts that are not owned by the user
    }

    const updatedUserData = deletePostById(post.id);
    // Simulate an asynchronous operation (like API call) before updating UI
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update UI or show toast after successful deletion
    toast("Post deleted successfully");
    console.log(updatedUserData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn("h-5 w-5 cursor-pointer dark:text-neutral-400", className)}
        />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        {isPostMine && (
          <SubmitButton onClick={handleDeletePost} className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
            Delete post
          </SubmitButton>
        )}

        {isPostMine && (
          <Link scroll={false} href={`/dashboard/p/${post.id}/edit`} className="postOption p-3">
            Edit
          </Link>
        )}

        <form action="" className="postOption border-0">
          <button className="w-full p-3">Hide like count</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PostOptions;
