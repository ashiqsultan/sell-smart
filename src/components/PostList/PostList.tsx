import { useContext, ChangeEvent } from 'react';
import { TextField, List, ListItem, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostListItem from './PostListItem';
import { AppContext } from '../../context/AppContext';

const PostList: React.FC = () => {
  const { state, dispatch, changeOffset } = useContext(AppContext);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    dispatch({ type: 'SET_KEYWORD', payload: newKeyword });
  };

  const handlePreviousPage = () => {
    changeOffset(state.offset - state.limit);
  };

  const handleNextPage = () => {
    changeOffset(state.offset + state.limit);
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          columnGap: '3rem',
        }}
      >
        <Button
          variant='outlined'
          disabled={state.offset === 0}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <Button variant='outlined' onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PostList;
