// Import necessary modules
'use client'
import userData from '../data/userData.json';
import { User } from 'next-auth';
import Link from 'next/link';
import { useOptimistic, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type CommentWithExtras = {
  id: string;
  user: User;
  text: string;
};

type CommentPost = {
  id: string;
  user: User;
  comments: CommentWithExtras[];
  // ... other fields
};

// Define CreateComment schema using zod
const CreateComment = z.object({
  body: z.string().nonempty('Comment cannot be empty'),
});

type CommentFormValues = {
  body: string;
  postId: string; // Add postId property to the form values
};

// Main Comments component
function Comments({
  postId,
  user,
}: {
  postId: string;
  user?: User | null;
}) {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: '',
      postId,
    },
  });

  const [optimisticComments, setOptimisticComments] = useOptimistic<CommentWithExtras[]>(
    userData.find((post) => post.id === postId)?.comments || []
  );

  const [isPending, startTransition] = useTransition();

  const addOptimisticComment = (newComment: string) => {
    const newCommentObj: CommentWithExtras = {
      id: 'newCommentId',
      user: {
        id: user?.id || 'defaultUserId',
        username: user?.username || 'DefaultUsername',
      },
      text: newComment,
    };

    startTransition(() => {
      setOptimisticComments((prevComments) => [newCommentObj, ...prevComments]);
    });
  };

  const body = form.watch('body');
  const commentsCount = optimisticComments.length;

  const post = userData.find((post) => post.id === postId);

  if (!post) {
    // Handle case when post with postId is not found in userData
    return null;
  }

  const { comments } = post;

  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      {commentsCount > 1 && (
        <Link
          scroll={false}
          href={`/dashboard/p/${postId}`}
          className="text-sm font-medium text-neutral-500"
        >
          View all {commentsCount} comments
        </Link>
      )}

      {optimisticComments.slice(0, 3).map((comment, i) => {
        const username = comment.user?.username;

        return (
          <div
            key={i}
            className="text-sm flex items-center space-x-2 font-medium"
          >
            <Link href={`/dashboard/${username}`} className="font-semibold">
              {username}
            </Link>
            <p>{comment.text}</p>
          </div>
        );
      })}

      {/* Form for adding comments */}
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const valuesCopy = { ...values };
          form.reset();
          startTransition(() => {
            // Add optimistic comment directly to userData.json
            userData.forEach((post) => {
              if (post.id === postId) {
                post.comments.unshift({
                  id: 'newCommentId', // generate a unique id for the new comment
                  user: {
                    id: user?.id || 'defaultUserId',
                    username: user?.username || 'DefaultUsername',
                  },
                  text: valuesCopy.body,
                });
              }
            });
          });

          // Save the updated userData.json to the file system (if needed)
          // Note: Writing to files in a real-world scenario might require server-side code.
          // ...

          // Optionally, log or do something with the updated userData
          console.log(userData);

          // Avoid using createComment here since we're not interacting with a real database
        })}
        className="border-b border-gray-300 dark:border-neutral-800 pb-3 py-1 flex items-center space-x-2"
      >
        {/* Form field for entering comments */}
        <input
          type="text"
          placeholder="Add a comment..."
          className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 dark:text-white dark:placeholder-neutral-400 font-medium"
          {...form.register('body')}
        />

{body.trim().length > 0 && (
  <div>
    <button
      type="submit"
      className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed"
    >
      Post
    </button>
  </div>
)}

      </form>
    </div>
  );
}

export default Comments;
