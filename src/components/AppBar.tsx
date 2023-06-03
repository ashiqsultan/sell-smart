import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function MainAppBar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCreateAccountClick = () => {
    navigate('/signup');
  };

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
              <Button
                variant='outlined'
                // style={{ outline: '1px solid red' }}
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
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
