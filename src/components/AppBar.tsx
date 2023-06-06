import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getInfo, logout } from '../api/account';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import { getById } from '../api/userDetails';

export default function MainAppBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [userName, setUserName] = useState<string | null>(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCreateAccountClick = () => {
    navigate('/signup');
  };
  const handleSellClick = () => {
    navigate('/create-post');
  };
  const handleLogoutClick = async () => {
    await logout();
    dispatch({ type: 'SET_LOGGED_IN', payload: false });
  };

  useEffect(() => {
    const updateUserName = async () => {
      const user = await getInfo();
      const usetDetails = await getById(user.$id);
      setUserName(usetDetails.name);
    };
    updateUserName();
  }, [state.isLoggedIn]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div>
              <Typography
                variant='h6'
                onClick={() => {
                  navigate('/');
                }}
                style={{
                  cursor: 'pointer',
                }}
              >
                Sell Smart
              </Typography>
            </div>
            <Box display={'flex'} columnGap={'2rem'}>
              {!state.isLoggedIn ? (
                <>
                  <Button
                    variant='outlined'
                    color='inherit'
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button
                    variant='contained'
                    sx={{
                      background: 'white',
                      color: (theme) => theme.palette.primary.main,
                      ':hover': {
                        color: (theme) => theme.palette.primary.main,
                        background: '#e1e1e1',
                      },
                    }}
                    onClick={handleCreateAccountClick}
                  >
                    Create Account
                  </Button>
                </>
              ) : (
                <>
                  {userName && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1 }}>{userName[0]}</Avatar>
                      <Typography variant='body1'>{userName}</Typography>
                    </div>
                  )}
                  <Button
                    variant='contained'
                    color='secondary'
                    endIcon={<AddIcon />}
                    onClick={handleSellClick}
                  >
                    Sell
                  </Button>
                  <IconButton color='inherit' onClick={handleLogoutClick}>
                    <LogoutIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
