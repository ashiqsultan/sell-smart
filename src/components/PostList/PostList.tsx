import { useEffect, useReducer, ChangeEvent, useCallback } from 'react';
import { TextField, List, ListItem, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as postsAPI from '../../api/posts';
import { IPostDoc } from '../../api/posts';
import PostListItem from './PostListItem';
import debounce from 'lodash-es/debounce';

const filterPostsByTitle = async (title: string): Promise<IPostDoc[]> => {
  const filteredPosts: IPostDoc[] = await postsAPI.filterTitle(title);
  return filteredPosts;
};

interface State {
  keyword: string;
  filteredPosts: IPostDoc[];
}

type Action =
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'SET_FILTERED_POSTS'; payload: IPostDoc[] };

const initialState: State = {
  keyword: '',
  filteredPosts: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };
    case 'SET_FILTERED_POSTS':
      return { ...state, filteredPosts: action.payload };
    default:
      return state;
  }
};

const debounceDelay = 500;
const PostList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const debouncedFilterPosts = useCallback(
    debounce(async (title: string) => {
      try {
        const filteredPosts = await filterPostsByTitle(title);
        dispatch({ type: 'SET_FILTERED_POSTS', payload: filteredPosts });
      } catch (error) {
        console.error(error);
      }
    }, debounceDelay),
    []
  );

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    dispatch({ type: 'SET_KEYWORD', payload: newKeyword });
    debouncedFilterPosts(newKeyword);
  };

  useEffect(() => {
    return () => {
      // Cleanup the debounced function on component unmount
      debouncedFilterPosts.cancel();
    };
  }, []);

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
