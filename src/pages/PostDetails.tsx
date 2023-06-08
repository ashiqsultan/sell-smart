import { useParams } from 'react-router-dom';
import PostDetailsComponent from '../components/PostDetails';

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  return (
    <>
      <PostDetailsComponent postId={postId} />
    </>
  );
};
export default PostDetails;
