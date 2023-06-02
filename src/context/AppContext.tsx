import { createContext, useReducer, useEffect } from 'react';
import { IPostDoc } from '../api/posts';
import { ICity, getByStateId } from '../api/cities';
import filterPosts from '../util/filterPosts';

export interface IAppState {
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

const initialState: IAppState = {
  keyword: '',
  filteredPosts: [],
  stateId: '',
  cities: [],
  cityId: '',
};

const reducer = (state: IAppState, action: Action): IAppState => {
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
  state: IAppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredPosts = await filterPosts(state);
        dispatch({ type: 'SET_FILTERED_POSTS', payload: filteredPosts });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [state.keyword, state.stateId, state.cityId]);

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
