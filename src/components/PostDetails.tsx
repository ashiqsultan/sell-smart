import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { IPostDoc, getById } from '../api/posts';
import { useParams } from 'react-router-dom';
import PostImageViewer from './PostImageViewer';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import RoomIcon from '@mui/icons-material/Room';
import TodayIcon from '@mui/icons-material/Today';
import * as stateAPI from '../api/states';
import * as cityAPI from '../api/cities';
import UserDetailsCard from './UserDetailsCard';

const PostDetails: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPostDoc | null>(null);
  const [stateLocation, setStateLocation] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDetails = await getById(postId || '');
        const stateDetails = await stateAPI.getById(postDetails.state_id);
        const cityDetails = await cityAPI.getById(postDetails.city_id);
        setStateLocation(stateDetails.name);
        setCity(cityDetails.name);
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

  const { user_id, title, price, description, image_ids, $createdAt } = post;

  return (
    <Box p={3}>
      <Grid container spacing={4} mt={3} wrap='wrap'>
        <Grid item xs={12} sm={6}>
          <PostImageViewer imageIds={image_ids || []} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
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
                    <span style={{ fontSize: '22px' }}>₹</span>{' '}
                    <span
                      style={{
                        color: 'green',
                        fontSize: '28px',
                        fontWeight: 'bold',
                      }}
                    >
                      {price}
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: 'right' }}
                  marginTop={'2rem'}
                >
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item>
                      <TodayIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant='body1'>
                        Posted at:{' '}
                        {new Date($createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item>
                      <LocationCityIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle1'>
                        {stateLocation}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item>
                      <RoomIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle1'>{city}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} marginTop={'2rem'}>
                  <Typography variant='h6'>Description</Typography>
                  <Typography variant='body1'>{description}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid item xs={12} mt={3}>
            <Typography variant='subtitle1' gutterBottom>
              Sold By
            </Typography>
            <UserDetailsCard userId={user_id} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostDetails;
