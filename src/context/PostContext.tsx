import { createContext, useReducer, useEffect } from 'react';
import { IPostDoc } from '../api/posts';
import * as postsAPI from '../api/posts';

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

export const PostContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const PostProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
