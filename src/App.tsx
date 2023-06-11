import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppContextProvider } from './context/AppContext';
import AppBar from './components/AppBar';
import CreatePost from './components/CreatePosts';
import PostDetails from './pages/PostDetails';
import PostList from './components/PostList/PostList';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import ChatApp from './pages/ChatApp';
import EditPost from './components/EditPost';
import Chats from './pages/Chats';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008060',
    },
  },
});

function App() {
  const appStyle = {
    margin: '10px 14px',
    [theme.breakpoints.up('md')]: {
      margin: '20px 50px',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '24px 128px',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContextProvider>
          <AppBar />
          <CssBaseline />
          <Box sx={appStyle}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/posts' element={<PostList />} />
              <Route path='/post/:postId' element={<PostDetails />} />
              <Route path='/post/edit/:postId' element={<EditPost />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/user/:userId' element={<UserDetails />} />
              <Route path='/chat/:chatId' element={<ChatApp />} />
              <Route path='/chats' element={<Chats />} />

              <Route path='*' element={<div>404 Page Not Found</div>} />
            </Routes>
          </Box>
        </AppContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
