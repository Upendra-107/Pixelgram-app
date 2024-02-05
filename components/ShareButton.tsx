// ShareButton.tsx
'use client'
import ActionIcon from "@/components/ActionIcon";
import { Link, Send } from "lucide-react";
import { toast } from "sonner";
import userData from "../data/userData.json"; // Adjust the path accordingly

function ShareButton({ postId }: { postId: string }) {
  const post = userData.find((p) => p.id === postId);

  if (!post) {
    // Handle case when post with postId is not found in userData
    return null;
  }

  return (
    <ActionIcon
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/dashboard/p/${postId}`
        );
        toast("Link copied to clipboard", {
          icon: <Link className={"h-5 w-5"} />,
        });
      }}
    >
      <Send className={"h-6 w-6"} />
    </ActionIcon>
  );
}

export default ShareButton;
