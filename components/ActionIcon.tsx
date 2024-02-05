// ActionIcon.tsx
import { Button, ButtonProps } from './ui/button'; // Adjust the path based on your project structure
import React, { ReactNode } from 'react';

type ActionIconProps = ButtonProps & {
  postId?: string; // Make postId optional
  children: ReactNode;
};

function ActionIcon({ postId, children, ...buttonProps }: ActionIconProps) {
  return (
    <Button
      type="submit"
      variant={'ghost'}
      size={'icon'}
      className="h-9 w-9"
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export default ActionIcon;
