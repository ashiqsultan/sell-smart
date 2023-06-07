import { getInfo } from '../api/account';
import ModalProgress from '../components/ModalProgress';
import UserPostsComponent from '../components/UserPosts';
import { useEffect, useState } from 'react';

const UserPosts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setIsOpen(true); // Open the modal
        const userDetails = await getInfo();
        setUserId(userDetails.$id);
      } catch (error) {
        console.error(error);
      } finally {
        setIsOpen(false); // Close the modal
      }
    };
    fetchUserPosts();
  }, []);
  return (
    <>
      <ModalProgress isOpen={isOpen} />
      <UserPostsComponent userId={userId} />
    </>
  );
};
export default UserPosts;
