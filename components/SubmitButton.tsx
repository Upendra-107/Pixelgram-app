// SubmitButton.tsx

import { useMutation } from 'react-query';
import userData from "../data/userData.json"; // Adjust the path accordingly

type Props = {
  children: React.ReactNode;
  postId?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function updatePostStatus(postId: string) {
  const updatedUserData = userData.map((post) =>
    post.id === postId ? { ...post, status: "pending" } : post
  );
  // Save the updated data back to the file or storage mechanism of your choice
  // For simplicity, you can overwrite the existing file, but in a real app, you'd use a proper database or storage solution
  // fs.writeFileSync('path-to-your-userData.json', JSON.stringify(updatedUserData, null, 2));
  return updatedUserData;
}

function SubmitButton({ children, postId, onClick, ...props }: Props) {
  const mutation = useMutation<void, Error>(() => {
    if (postId) {
      // Update post status
      const updatedUserData = updatePostStatus(postId);
      // Simulate an asynchronous operation (like API call) before updating UI
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          // Update UI or show toast after successful status update
          console.log(updatedUserData);
          resolve();
        }, 1000);
      });
    } else {
      return Promise.reject(new Error('postId is not available'));
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    mutation.mutate(); // Trigger the mutation
    onClick?.(event); // Invoke the original onClick handler
  };

  return (
    <button type="submit" disabled={mutation.isLoading} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export default SubmitButton;
