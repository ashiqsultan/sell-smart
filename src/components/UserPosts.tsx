import { useEffect, useState } from 'react';
import { getInfo } from '../api/account';
import { IPostDoc, getByUserId } from '../api/posts';
import PostListItem from './PostList/PostListItem';

const UserPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState<IPostDoc[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Get user details
        const userDetails = await getInfo();
        // Get userId from userinfo
        const userId = userDetails.$id;
        // Get all posts of the user
        const posts = await getByUserId(userId);
        setUserPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPosts();
  }, []);

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
