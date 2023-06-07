import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/account';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email') as string;
      const password = data.get('password') as string;
      const isLoginRequest = await login(email, password);
      if (isLoginRequest.$id) {
        dispatch({ type: 'SET_USER_ID', payload: isLoginRequest.$id });
        navigate('/');
      }
    } catch (error) {
      console.error('Login Error');
    }
  };

  useEffect(() => {
    // Redirect if already logged in
    if (state.userId) {
      navigate('/');
    }
  }, [state.userId]);

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};
export default Login;
