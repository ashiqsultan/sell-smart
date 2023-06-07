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
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import { AccountCircle, Phone, Today, Chat } from '@mui/icons-material';
import {
  getById,
  IUserDetailsDoc,
  updateUserDetails,
} from '../api/userDetails';
import ModalProgress from './ModalProgress';
import { getOrCreateChatIdByIds } from '../api/chats';
import { getInfo } from '../api/account';
import { Edit } from '@mui/icons-material';

const UserDetailsCard: React.FC<{ userId: string }> = ({ userId }) => {
  const [userDetails, setUserDetails] = useState<IUserDetailsDoc | null>(null);
  const [isSessionUser, setIsSessionUser] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');

  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const user = await getById(userId || '');
      setUserDetails(user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchSessionUser = async () => {
      const sessionUserInfo = await getInfo();
      setIsSessionUser(sessionUserInfo.$id === userId);
    };
    fetchUserDetails();
    fetchSessionUser();
  }, []);

  if (!userDetails) {
    return <ModalProgress isOpen={true}></ModalProgress>;
  }

  const { name, bio, phone_number, $createdAt } = userDetails;
  const handlePhoneCall = () => {
    window.location.href = `tel:${phone_number}`;
  };
  const handleStartChat = async () => {
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

  const handleEditOpen = () => {
    setIsEditOpen(true);
    setUpdatedName(name);
    setUpdatedBio(bio);
    setUpdatedPhoneNumber(phone_number);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleUpdate = async () => {
    try {
      // Call API to update user details with updatedName and updatedBio
      await updateUserDetails(userId, {
        name: updatedName,
        bio: updatedBio,
        phone_number: updatedPhoneNumber,
      });
      // Close the modal and fetch updated user details
      setIsEditOpen(false);
      await fetchUserDetails();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display='flex' alignItems='center' mt={2}>
            <Avatar sx={{ mr: 2 }}>
              <AccountCircle />
            </Avatar>
            <Typography variant='h6'>
              {name}
              {isSessionUser && (
                <IconButton color='primary' onClick={handleEditOpen}>
                  <Edit />
                </IconButton>
              )}
            </Typography>
          </Box>
          <Box mt={3}>
            {isSessionUser && (
              <Grid container spacing={2} alignItems='center' my={1}>
                <Grid item>
                  <Phone color='info' />
                </Grid>
                <Grid item>
                  <Typography variant='body1'>{phone_number}</Typography>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2} alignItems='center' my={1}>
              <Grid item>
                <Today color='action' />
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
        {!isSessionUser && (
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
        )}
      </Card>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onClose={handleEditClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '80%',
            maxWidth: 400,
          }}
        >
          <Typography variant='h6' align='center' mb={1}>
            Update User Details
          </Typography>
          <TextField
            label='Name'
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            fullWidth
            sx={{ marginBlock: '1rem' }}
          />
          <TextField
            label='Bio'
            value={updatedBio}
            onChange={(e) => setUpdatedBio(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBlock: '1rem' }}
          />
          <TextField
            label='Phone Number'
            value={updatedPhoneNumber}
            onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
            fullWidth
            sx={{ marginBlock: '1rem' }}
          />
          <Box display='flex' justifyContent='flex-end' columnGap={2}>
            <Button color='primary' onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserDetailsCard;
