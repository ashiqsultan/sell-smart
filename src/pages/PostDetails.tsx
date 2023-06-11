import { useParams } from 'react-router-dom';
import PostDetailsComponent from '../components/PostDetails';

const PostDetails: React.FC = () => {
  const params = useParams();
  const postId = params.postId || '';
  return (
    <>
      <PostDetailsComponent postId={postId} />
    </>
  );
};
export default PostDetails;
