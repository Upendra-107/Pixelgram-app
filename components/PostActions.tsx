// PostActions.tsx
import userData from '../data/userData.json'; // Adjust the path based on your project structure
import { cn } from '../lib/utils'; // Adjust the path based on your project structure
import ActionIcon from './ActionIcon'; // Adjust the path based on your project structure
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import LikeButton from './Like';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';

type Props = {
  post: any; // Assuming post is an object
  userId?: string;
  className?: string;
};

function PostActions({ post, userId, className }: Props) {
  if (!post) {
    // Handle case when post is not available
    return null;
  }

  return (
    <div className={cn('relative flex items-start w-full gap-x-2', className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon postId={post.id}>
          <MessageCircle className={'h-6 w-6'} />
        </ActionIcon>
      </Link>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} />
    </div>
  );
}

export default PostActions;
