import { createContext, useReducer, useEffect, useCallback } from 'react';
import { IPostDoc } from '../api/posts';
import { ICity, getByStateId } from '../api/cities';
import filterPosts from '../util/filterPosts';
import * as categoriesAPI from '../api/categories';
import { ICategory } from '../api/categories';
import { getInfo } from '../api/account';

export interface IAppState {
  keyword: string;
  filteredPosts: IPostDoc[];
  stateId: string;
  cities: ICity[];
  cityId: string;
  categories: ICategory[];
  categoryId: string;
  minPrice: number | null;
  maxPrice: number | null;
  userId: string;
  limit: number;
  offset: number;
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
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'SET_OFFSET'; payload: number }
  | { type: 'CLEAR_FILTERS' };

const initialState: IAppState = {
  keyword: '',
  filteredPosts: [],
  stateId: '',
  cities: [],
  cityId: '',
  categories: [],
  categoryId: '',
  minPrice: null,
  maxPrice: null,
  userId: '',
  limit: 2,
  offset: 0,
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
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_OFFSET':
      return { ...state, offset: action.payload };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        keyword: '',
        stateId: '',
        cityId: '',
        categoryId: '',
        minPrice: null,
        maxPrice: null,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: IAppState;
  dispatch: React.Dispatch<Action>;
  changeOffset: (newOffset: number) => void;
}>({
  state: initialState,
  dispatch: () => null,
  changeOffset: () => null,
});

export const AppContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatePosts = useCallback(
    async (offset: number) => {
      try {
        const filteredPosts = await filterPosts(state, offset);
        dispatch({ type: 'SET_FILTERED_POSTS', payload: filteredPosts });
      } catch (error) {
        console.error(error);
      }
    },
    [state]
  );
  const changeOffset = useCallback(
    (newOffset: number) => {
      dispatch({ type: 'SET_OFFSET', payload: newOffset });
      updatePosts(newOffset);
    },
    [dispatch, updatePosts]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories: ICategory[] = await categoriesAPI.getAll();
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
      } catch (error) {
        console.error(error);
      }
    };
    const getSessionInfo = async () => {
      try {
        const info = await getInfo();
        if (info.$id) {
          dispatch({ type: 'SET_USER_ID', payload: info.$id });
        }
      } catch (error) {
        dispatch({ type: 'SET_USER_ID', payload: '' });
        console.error(error);
      }
    };
    getSessionInfo();
    fetchCategories();
  }, []);

  useEffect(() => {
    updatePosts(0);
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, [state.stateId]);

  useEffect(() => {
    if (state.cities.filter((i) => i.$id === state.cityId).length === 0) {
      dispatch({ type: 'SET_CITY_ID', payload: '' });
    }
  }, [state.cities]);

  return (
    <AppContext.Provider value={{ state, dispatch, changeOffset }}>
      {children}
    </AppContext.Provider>
  );
};
