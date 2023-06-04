import { useEffect, useState } from 'react';
import { Typography, Box, Avatar, Grid } from '@mui/material';
import { AccountCircle, Description, Phone, Today } from '@mui/icons-material';
import { getById, IUserDetailsDoc } from '../api/userDetails';
import { useParams } from 'react-router-dom';
import ModalProgress from '../components/ModalProgress';

const UserDetails: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IUserDetailsDoc | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getById(userId || '');
        setUserDetails(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <ModalProgress isOpen={true}></ModalProgress>;
  }

  const { name, bio, phone_number, $createdAt } = userDetails;

  return (
    <Box p={4}>
      <Typography variant='h4'>User Details</Typography>
      <Box display='flex' alignItems='center' mt={4}>
        <Avatar sx={{ mr: 2 }}>
          <AccountCircle />
        </Avatar>
        <Typography variant='h6'>{name}</Typography>
      </Box>
      <Box mt={4}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Description />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{bio}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Phone />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{phone_number}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Today />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              Member Since: {new Date($createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetails;
