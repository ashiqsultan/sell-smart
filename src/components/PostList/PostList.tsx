import { useContext, ChangeEvent } from 'react';
import { TextField, List, ListItem, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostListItem from './PostListItem';
import { PostContext } from '../../context/PostContext';

const PostList: React.FC = () => {
  const { state, dispatch } = useContext(PostContext);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    dispatch({ type: 'SET_KEYWORD', payload: newKeyword });
  };

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        fullWidth
        value={state.keyword}
        onChange={handleKeywordChange}
        label='Search'
        variant='outlined'
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <List>
        {state.filteredPosts.map((post) => (
          <ListItem key={post.$id}>
            <PostListItem post={post} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PostList;
