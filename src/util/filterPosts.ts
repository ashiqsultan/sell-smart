import { IAppState } from '../context/AppContext';
import { IPostDoc, IQueryOptions, apiFilters } from '../api/posts';

const filterPosts = async (
  state: IAppState,
  offset = 0
): Promise<IPostDoc[]> => {
  const { keyword, stateId, cityId, categoryId, minPrice, maxPrice, limit } =
    state;
  const options: IQueryOptions = {
    limit,
    offset,
  };
  let filteredPosts: IPostDoc[] = await apiFilters(
    keyword,
    stateId,
    cityId,
    categoryId,
    options
  );
  // Filter post by minPrice and maxPrice
  filteredPosts = filteredPosts.filter((post: IPostDoc) => {
    if (minPrice !== null && maxPrice !== null) {
      return post.price >= minPrice && post.price <= maxPrice;
    } else if (minPrice !== null) {
      return post.price >= minPrice;
    } else if (maxPrice !== null) {
      return post.price <= maxPrice;
    } else {
      return true; // No minPrice or maxPrice filter applied
    }
  });

  return filteredPosts;
};
export default filterPosts;
