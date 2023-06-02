import PostListItem from './PostListItem'; // Import the PostListItem component
import { IPostDoc, getAll } from '../../api/posts'; // Import the IPost interface
import { useEffect, useState } from 'react';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPostDoc[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAll();
        setPosts(allPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <PostListItem key={post.$id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
