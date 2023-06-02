import { createContext, useReducer, useEffect } from 'react';
import { IPostDoc } from '../api/posts';
import * as postsAPI from '../api/posts';
import { IState } from '../api/states';
import { ICity, getByStateId } from '../api/cities';

const filterPostsByTitle = async (title: string): Promise<IPostDoc[]> => {
  const filteredPosts: IPostDoc[] = await postsAPI.filterTitle(title);
  return filteredPosts;
};

interface State {
  keyword: string;
  filteredPosts: IPostDoc[];
  stateId: string;
  cities: ICity[];
  cityId: string;
}

type Action =
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'SET_FILTERED_POSTS'; payload: IPostDoc[] }
  | { type: 'SET_STATE_ID'; payload: string }
  | { type: 'SET_CITIES'; payload: ICity[] }
  | { type: 'SET_CITY_ID'; payload: string };

const initialState: State = {
  keyword: '',
  filteredPosts: [],
  stateId: '',
  cities: [],
  cityId: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };
    case 'SET_FILTERED_POSTS':
      return { ...state, filteredPosts: action.payload };
    case 'SET_STATE_ID':
      return { ...state, stateId: action.payload };
    case 'SET_CITIES':
      return { ...state, cities: action.payload };
    case 'SET_CITY_ID':
      return { ...state, cityId: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppContextProvider: React.FC = ({ children }) => {
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

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getByStateId(state.stateId);
        dispatch({ type: 'SET_CITIES', payload: cities });
        dispatch({ type: 'SET_CITY_ID', payload: '' });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, [state.stateId]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
