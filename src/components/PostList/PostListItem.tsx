import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid } from '@mui/material';
import { getFileById } from '../../api/postImages';
import { IPostDoc } from '../../api/posts';
import { useNavigate } from 'react-router-dom';

interface PostListItemProps {
  post: IPostDoc;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      if (post.image_ids && post.image_ids.length > 0) {
        try {
          const file = await getFileById(post.image_ids[0]); // Fetch the image using the API function
          setImageURL(file);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchImage();
  }, [post.image_ids]);

  const handleCardClick = () => {
    navigate(`/post/${post.$id}`);
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
      onClick={handleCardClick}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {imageURL && (
            <CardMedia
              component='img'
              height='200'
              image={imageURL}
              alt={post.title}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          <CardContent>
            <Typography variant='h5' component='div'>
              {post.title}
            </Typography>
            <Typography variant='h6' color='#93b592' fontWeight='bold'>
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
      </Grid>
    </Card>
  );
};

export default PostListItem;
