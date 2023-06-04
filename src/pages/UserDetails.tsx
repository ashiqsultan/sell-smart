import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  CardActions,
} from '@mui/material';
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
  const handlePhoneCall = () => {
    window.location.href = `tel:${phone_number}`;
  };
  return (
    <Box px={5}>
      <Card>
        {/* <CardHeader title={name} /> */}
        <CardContent>
          <Box display='flex' alignItems='center' mt={2}>
            <Avatar sx={{ mr: 2 }}>
              <AccountCircle />
            </Avatar>
            <Typography variant='h6'>{name}</Typography>
          </Box>
          <Box mt={4}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <Today />
              </Grid>
              <Grid item>
                <Typography variant='body1'>
                  Member Since:{' '}
                  {new Date($createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems='center' mt={1}>
              <Grid item>
                <Typography variant='subtitle1' fontWeight={600}>
                  About
                </Typography>
                <Typography variant='body1'>{bio}</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{ marginLeft: '5px' }}>
          <Button
            color='primary'
            startIcon={<Phone />}
            onClick={handlePhoneCall}
          >
            Call
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserDetails;
