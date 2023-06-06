import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from '@mui/material';
import { AccountCircle, Phone, Today, Chat } from '@mui/icons-material';
import { getById, IUserDetailsDoc } from '../api/userDetails';
import ModalProgress from './ModalProgress';
import { getOrCreateChatIdByIds } from '../api/chats';
import { getInfo } from '../api/account';

const UserDetailsCard: React.FC<{ userId: string }> = ({ userId }) => {
  const [userDetails, setUserDetails] = useState<IUserDetailsDoc | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getById(userId || '');
        setUserDetails(user);
      } catch (error) {
        console.error(error);
      }
    };
    console.log({ userId });

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <ModalProgress isOpen={true}></ModalProgress>;
  }

  const { name, bio, phone_number, $createdAt } = userDetails;
  const handlePhoneCall = () => {
    window.location.href = `tel:${phone_number}`;
  };
  const handleStartChat = async () => {
    // TODO
    // Get chat by user ids
    // One is session user id and another is the this param userId
    try {
      const sessionUser = await getInfo();
      if (sessionUser.$id && userId) {
        const chatId = await getOrCreateChatIdByIds(sessionUser.$id, userId);
        console.log('handleStartChat chat id');
        console.log(chatId);
        navigate(`/chat/${chatId}`);
      } else {
        console.log('You need to login to Chat');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
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
        <CardActions
          sx={{
            marginLeft: '5px',
            display: 'flex',
            justifyContent: 'flex-start',
            columnGap: '1rem',
          }}
        >
          <Button
            color='primary'
            startIcon={<Chat />}
            onClick={handleStartChat}
          >
            Chat
          </Button>
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

export default UserDetailsCard;
