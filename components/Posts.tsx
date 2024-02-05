import Post from "./Post";
import userData from '../data/userData.json';

function Posts() {
  return (
    <>
      {userData.map((post: any) => ( 
        <Post key={post.id} post={post} />
        
      ))}
    </>
  );
}

export default Posts;
