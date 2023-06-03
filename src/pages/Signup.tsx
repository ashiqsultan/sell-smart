import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

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
      <Grid container direction='column' alignItems='center' spacing={1}>
        <Grid item>
          <Typography variant='h5'>Sign Up</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <TextField
                  type='email'
                  label='Email'
                  value={email}
                  onChange={handleEmailChange}
                  variant='outlined'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  type='password'
                  label='Password'
                  value={password}
                  onChange={handlePasswordChange}
                  variant='outlined'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  type='text'
                  label='Name'
                  value={name}
                  onChange={handleNameChange}
                  variant='outlined'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  type='text'
                  label='Bio'
                  value={bio}
                  onChange={handleBioChange}
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  type='text'
                  label='Phone Number'
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  variant='outlined'
                  fullWidth
                />
              </Grid>
              <Grid item alignContent={'center'} justifyContent={'center'}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
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
      </Grid>
    </>
  );
};

export default SignUp;
