import { useEffect, useReducer, ChangeEvent } from 'react';
import * as postsAPI from '../../api/posts';
import { IPostDoc } from '../../api/posts';
import PostListItem from './PostListItem';

// API function to filter posts based on title
const filterPostsByTitle = async (title: string): Promise<IPostDoc[]> => {
  // Replace with your actual API call to filter posts by title
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

const PostList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_KEYWORD', payload: event.target.value });
  };

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const filteredPosts = await filterPostsByTitle(state.keyword);
        dispatch({ type: 'SET_FILTERED_POSTS', payload: filteredPosts });
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredPosts();
  }, [state.keyword]);

  return (
    <div>
      <input
        type='text'
        value={state.keyword}
        onChange={handleKeywordChange}
        placeholder='Search by title'
      />
      <div>
        {state.filteredPosts.map((post) => (
          <PostListItem key={post.$id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
