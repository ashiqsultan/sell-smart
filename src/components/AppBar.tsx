import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import StoreIcon from '@mui/icons-material/Store';
import { Person, Chat, ExitToApp, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { logout } from '../api/account';
import { getById } from '../api/userDetails';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function MainAppBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [userName, setUserName] = useState<string | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onLoginClick = () => {
    navigate('/login');
  };

  const onSignUpClick = () => {
    navigate('/signup');
  };
  const onSellClick = () => {
    if (state.userId) {
      navigate('/create-post');
    } else {
      navigate('/login');
    }
  };
  const handleLogoutClick = async () => {
    await logout();
    dispatch({ type: 'SET_USER_ID', payload: '' });
    navigate(`/`);
  };

  const onProfileClick = () => {
    if (state.userId) {
      navigate(`/user/${state.userId}`);
    }
  };
  const onChatsClick = () => {
    if (state.userId) {
      navigate(`/chats`);
    }
  };

  const profilePages = [
    { name: 'Profile', icon: <Person />, onClick: onProfileClick },
    { name: 'Chats', icon: <Chat />, onClick: onChatsClick },
    { name: 'Logout', icon: <ExitToApp />, onClick: handleLogoutClick },
  ];

  const newUserMenu = [
    { name: 'Login', icon: <LoginIcon />, onClick: onLoginClick },
    { name: 'Signup', icon: <ManageAccountsIcon />, onClick: onSignUpClick },
  ];

  useEffect(() => {
    const updateUserName = async () => {
      if (state.userId) {
        const userDetails = await getById(state.userId);
        setUserName(userDetails.name);
      } else {
        setUserName(null);
      }
    };
    updateUserName();
  }, [state.userId]);

  return (
    <AppBar position='static'>
      <Toolbar>
        {/* Desktop */}
        <Box
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          flexGrow={1}
        >
          <IconButton
            onClick={() => {
              navigate('/');
            }}
            sx={{ mr: 1 }}
          >
            <StoreIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              ml: 2,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Sell Smart
          </Typography>
        </Box>
        {/* Mobile */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            display={'flex'}
            justifyContent='flex-start'
            alignItems={'center'}
            flexGrow={1}
          >
            <IconButton
              onClick={() => {
                navigate('/');
              }}
              sx={{ mr: 1 }}
            >
              <StoreIcon sx={{ color: 'white' }} />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Sell Smart
            </Typography>
          </Box>
        </Box>
        {/* New Sell Button */}
        <Button
          variant='contained'
          color='secondary'
          endIcon={<Add />}
          onClick={onSellClick}
          sx={{ marginRight: '1rem', paddingInline: '2rem' }}
        >
          Sell
        </Button>
        {/* User Menu */}
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {userName ? (
              <Avatar sx={{ mr: 1 }}>{userName[0]}</Avatar>
            ) : (
              <Avatar sx={{ mr: 1 }}>
                <ManageAccountsIcon />
              </Avatar>
            )}
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {userName
              ? profilePages.map((setting) => (
                  <MenuItem key={setting.name} onClick={setting.onClick}>
                    {setting.icon}
                    <Typography ml={2} py={1} textAlign='center'>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))
              : newUserMenu.map((setting) => (
                  <MenuItem key={setting.name} onClick={setting.onClick}>
                    {setting.icon}
                    <Typography ml={2} py={1} textAlign='center'>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default MainAppBar;
