import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Box,
  Avatar,
} from '@mui/material';
import { Person } from '@mui/icons-material';

import { createAccount } from '../api/account';
import { createUserDetail } from '../api/userDetails';
import ModalProgress from '../components/ModalProgress';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Create account
      const newAccount = await createAccount(email, password);

      // Create user details
      const newUserDetails = await createUserDetail(
        newAccount.$id,
        name,
        bio,
        phoneNumber
      );
      if (newUserDetails.$id) {
        // Show success message
        setSuccessMessage(
          'Account created successfully. Redirecting you to Home page.'
        );
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
        setBio('');
        setPhoneNumber('');
        // Navigate to homepage
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setError('Failed to create account');
    }

    setIsLoading(false);
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <>
      <ModalProgress isOpen={isLoading} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100vh',
        }}
      >
        <Card>
          <CardContent sx={{ padding: '2rem' }}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              rowGap={1}
            >
              <Avatar>
                <Person />
              </Avatar>
              <Typography variant='h5' component='div' sx={{ mb: 2 }}>
                Sign up
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                type='email'
                label='Email'
                value={email}
                onChange={handleEmailChange}
                variant='outlined'
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                type='password'
                label='Password'
                value={password}
                onChange={handlePasswordChange}
                variant='outlined'
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                type='text'
                label='Name'
                value={name}
                onChange={handleNameChange}
                variant='outlined'
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                type='text'
                label='Bio'
                value={bio}
                onChange={handleBioChange}
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                type='text'
                label='Phone Number'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isLoading}
                fullWidth
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity='error' onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{ width: '50%' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='success' onClose={handleCloseSnackbar}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignUp;
