import { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  IconButton,
} from '@mui/material';
import { getFileById } from '../../api/postImages';
import { IPostDoc } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AppContext } from '../../context/AppContext';

interface PostListItemProps {
  post: IPostDoc;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isSessionUser, setIsSessionUser] = useState(false);

  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      if (post.image_ids && post.image_ids.length > 0) {
        try {
          const file = await getFileById(post.image_ids[0]);
          // @ts-ignore
          setImageURL(file);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchImage();
  }, [post.image_ids]);

  useEffect(() => {
    setIsSessionUser(state.userId === post.user_id);
  }, []);
  const handleCardClick = () => {
    navigate(`/post/${post.$id}`);
  };
  const handleEditClick = () => {
    navigate(`/post/edit/${post.$id}`);
  };

  return (
    <Card
      sx={{
        mb: 2,
        width: '100%',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {imageURL && (
            <CardMedia
              component='img'
              image={imageURL}
              alt={post.title}
              height='100'
              onClick={handleCardClick}
            />
          )}
        </Grid>
        <Grid item xs={isSessionUser ? 8 : 9}>
          <CardContent onClick={handleCardClick}>
            <Typography variant='h6' component='div'>
              {post.title}
            </Typography>
            <Typography variant='h6' color='green' fontWeight='bold'>
              ₹{post.price}
            </Typography>
            <Typography variant='body2' color='grey' fontWeight='light'>
              {new Date(post.$createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </CardContent>
        </Grid>
        {isSessionUser && (
          <Grid item xs={1} display={'flex'} alignItems={'center'}>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default PostListItem;
