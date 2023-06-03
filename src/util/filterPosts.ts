import { IAppState } from '../context/AppContext';
import {
  IPostDoc,
  filterByState,
  filterByStateCity,
  filterTitle,
  filterTitleState,
  filterTitleStateCity,
  getAll,
} from '../api/posts';

const apiFilters = async (
  keyword: string,
  stateId: string,
  cityId: string
): Promise<IPostDoc[]> => {
  // Condition: stateId, cityId, and keyword are present
  if (stateId && cityId && keyword) {
    return await filterTitleStateCity(keyword, stateId, cityId);
  }
  // Condition: stateId and keyword are present, cityId is empty
  else if (stateId && keyword && !cityId) {
    return await filterTitleState(keyword, stateId);
  }
  // Condition: stateId is present, cityId and keyword are empty
  else if (stateId && !cityId && !keyword) {
    return await filterByState(stateId);
  }
  // Condition: stateId and cityId are present, keyword is empty
  else if (stateId && cityId && !keyword) {
    return await filterByStateCity(stateId, cityId);
  }
  // Condition: keyword is present, stateId and cityId are empty
  else if (keyword && !stateId && !cityId) {
    return await filterTitle(keyword);
  }
  // Default case
  return await getAll();
};
const filterPosts = async (state: IAppState): Promise<IPostDoc[]> => {
  const { keyword, stateId, cityId, categoryId } = state;
  const apiFilteredPosts: IPostDoc[] = await apiFilters(
    keyword,
    stateId,
    cityId
  );
  // Filter post by Category id
  if (categoryId) {
    return apiFilteredPosts.filter(
      (post: IPostDoc) => post.category_id === categoryId
    );
  }

  return apiFilteredPosts;
};
export default filterPosts;
