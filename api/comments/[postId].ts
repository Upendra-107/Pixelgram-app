// pages/api/comments/[postId].ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface Comment {
  id: string;
  user: {
    id: string;
    username: string;
  };
  text: string;
}

interface UserData {
  id: string;
  comments: Comment[];
  // ... other fields
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  try {
    // Read the existing userData.json file
    const filePath = path.join(process.cwd(), 'data', 'userData.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const userData: UserData[] = JSON.parse(fileContent);

    // Find the post by postId and update comments
    const postIndex = userData.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      const newComment: Comment = {
        id: 'newCommentId',
        user: {
          id: 'defaultUserId',
          username: 'DefaultUsername',
        },
        text: req.body.body,
      };
      userData[postIndex].comments.unshift(newComment);
    }

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf-8');

    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
