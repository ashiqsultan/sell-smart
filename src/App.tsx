import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './components/Home';
import AppBar from './components/AppBar';
import Login from './components/Login';
import CreatePost from './components/CreatePosts';
import PostDetails from './components/PostDetails';
import PostList from './components/PostList/PostList';
import { PostProvider } from './context/PostContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008060',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar />
        <PostProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/posts' element={<PostList />} />
            <Route path='/post/:postId' element={<PostDetails />} />
            <Route path='*' element={<div>404 Page Not Found</div>} />
          </Routes>
        </PostProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
