import { useEffect, useState } from 'react';
import { IPostDoc, getByUserId } from '../api/posts';
import PostListItem from './PostList/PostListItem';

const UserPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState<IPostDoc[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Get all posts of the user
        const posts = await getByUserId(userId);
        setUserPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <>
      {/* Render Post List using the Posts got from API */}
      {userPosts.map((post) => (
        <PostListItem post={post} key={post.$id} />
      ))}
    </>
  );
};

export default UserPosts;
