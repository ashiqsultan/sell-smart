import { createContext, useReducer, useEffect } from 'react';
import { IPostDoc } from '../api/posts';
import { ICity, getByStateId } from '../api/cities';
import filterPosts from '../util/filterPosts';
import * as categoriesAPI from '../api/categories';
import { ICategory } from '../api/categories';

export interface IAppState {
  keyword: string;
  filteredPosts: IPostDoc[];
  stateId: string;
  cities: ICity[];
  cityId: string;
  categories: ICategory[];
  categoryId: string;
  minPrice: number;
  maxPrice: number;
}

type Action =
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'SET_FILTERED_POSTS'; payload: IPostDoc[] }
  | { type: 'SET_STATE_ID'; payload: string }
  | { type: 'SET_CITIES'; payload: ICity[] }
  | { type: 'SET_CITY_ID'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: ICategory[] }
  | { type: 'SET_CATEGORY_ID'; payload: string }
  | { type: 'SET_MIN_PRICE'; payload: number }
  | { type: 'SET_MAX_PRICE'; payload: number };

const initialState: IAppState = {
  keyword: '',
  filteredPosts: [],
  stateId: '',
  cities: [],
  cityId: '',
  categories: [],
  categoryId: '',
  minPrice: 0,
  maxPrice: 9999999,
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
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_CATEGORY_ID':
      return { ...state, categoryId: action.payload };
    case 'SET_MIN_PRICE':
      return { ...state, minPrice: action.payload };
    case 'SET_MAX_PRICE':
      return { ...state, maxPrice: action.payload };
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
    const fetchCategories = async () => {
      try {
        const categories: ICategory[] = await categoriesAPI.getAll(); // Replace with your actual API call
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

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
  }, [
    state.keyword,
    state.stateId,
    state.cityId,
    state.categoryId,
    state.minPrice,
    state.maxPrice,
  ]);

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
