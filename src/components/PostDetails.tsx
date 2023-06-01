import { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { IPost, getById } from '../api/posts';
import { useParams } from 'react-router-dom';
import PostImageViewer from './PostImageViewer';

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDetails = await getById(postId || '');
        setPost(postDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post) {
    return null;
  }

  const {
    user_id,
    category_id,
    title,
    price,
    state_id,
    city_id,
    description,
    image_ids,
  } = post;

  return (
    <Box p={3}>
      <Typography variant='h5' gutterBottom>
        Post Details
      </Typography>

      <Divider />

      <Grid container spacing={2} mt={3}>
        <Grid item xs={6}>
          <Typography variant='subtitle1'>User ID:</Typography>
          <Typography>{user_id}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='subtitle1'>Category ID:</Typography>
          <Typography>{category_id}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='subtitle1'>Title:</Typography>
          <Typography>{title}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='subtitle1'>Price:</Typography>
          <Typography>{price}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='subtitle1'>State ID:</Typography>
          <Typography>{state_id}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='subtitle1'>City ID:</Typography>
          <Typography>{city_id}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1'>Description:</Typography>
          <Typography>{description}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1'>Image IDs:</Typography>
          <PostImageViewer imageIds={image_ids || []} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostDetails;
