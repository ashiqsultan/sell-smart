import { useParams } from 'react-router-dom';
import UserDetailsCard from '../components/UserDetailsCard';
import UserPosts from '../components/UserPosts';

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  return (
    <>
      <UserDetailsCard userId={userId} />
      <UserPosts userId={userId} />
    </>
  );
};
export default UserDetails;
