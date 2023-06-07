import { useParams } from 'react-router-dom';
import UserDetailsCard from '../components/UserDetailsCard';
import UserPosts from '../components/UserPosts';
import { useEffect, useState } from 'react';
import { getInfo } from '../api/account';
import { Typography } from '@mui/material';

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  const [isSessionUser, setIsSessionUser] = useState(false);
  useEffect(() => {
    const fetchSessionUser = async () => {
      // TODO
      // Replace this with state.userId
      const sessionUserInfo = await getInfo();
      setIsSessionUser(sessionUserInfo.$id === userId);
    };
    fetchSessionUser();
  }, []);
  return (
    <>
      <UserDetailsCard userId={userId} />
      <Typography variant='h6' my={2}>
        {isSessionUser ? 'Your Posts' : 'User Posts'}
      </Typography>
      <UserPosts userId={userId} />
    </>
  );
};
export default UserDetails;
