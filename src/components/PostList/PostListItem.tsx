import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid } from '@mui/material';
import { getFileById } from '../../api/postImages';
import { IPost } from '../../api/posts';

interface PostListItemProps {
  post: IPost;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

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

  return (
    <Card sx={{ mb: 2, width: '100%' }}>
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
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostListItem;
