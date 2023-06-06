import { useParams } from 'react-router-dom';
import UserDetailsCard from '../components/UserDetailsCard';

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  return (
    <>
      <UserDetailsCard userId={userId} />
    </>
  );
};
export default UserDetails;
