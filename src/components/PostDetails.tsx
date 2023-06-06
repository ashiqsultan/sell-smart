import { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { IPost, getById } from '../api/posts';
import { useParams } from 'react-router-dom';
import PostImageViewer from './PostImageViewer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RoomIcon from '@mui/icons-material/Room';

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
      <Grid container spacing={4} mt={3} wrap='wrap'>
        <Grid item xs={12} sm={6}>
          <PostImageViewer imageIds={image_ids || []} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          spacing={1}
          style={{ marginBottom: '20px' }}
        >
          <Grid item xs={12}>
            <Typography variant='h4'>{title}</Typography>
            <Typography>
              <span style={{ fontSize: '18px' }}>₹</span>{' '}
              <span
                style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}
              >
                {price}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Grid container alignItems='center' spacing={1}>
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item>
                <Typography>{user_id}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item>
                <LocationCityIcon />
              </Grid>
              <Grid item>
                <Typography>{state_id}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item>
                <RoomIcon />
              </Grid>
              <Grid item>
                <Typography>{city_id}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Description</Typography>
            <Typography variant='body1'>{description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostDetails;
