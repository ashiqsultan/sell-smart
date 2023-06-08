import { Databases, Query, ID, Models } from 'appwrite';
import config from '../config';
import client from './client';
import { getInfo } from './account';

export interface IPost {
  user_id: string;
  category_id: string;
  title: string;
  price: number;
  state_id: string;
  city_id: string;
  description?: string;
  image_ids?: string[];
}

export interface IPostDoc extends IPost, Models.Document {}

export interface IQueryOptions {
  limit: number;
  offset: number;
}
const defaultQueryOptions: IQueryOptions = { limit: 100, offset: 0 };

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.posts;

export const create = async (
  category_id: string,
  title: string,
  price: number,
  state_id: string,
  city_id: string,
  description: string,
  image_ids: string[]
): Promise<IPostDoc> => {
  try {
    const user_id = await getInfo();
    const data: IPost = {
      user_id: user_id.$id,
      category_id,
      title,
      price,
      state_id,
      city_id,
      description,
      image_ids,
    };

    console.log('input data', data);

    const result: IPostDoc = await database.createDocument<IPostDoc>(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAll = async (
  options = defaultQueryOptions
): Promise<IPostDoc[]> => {
  try {
    console.log({ options });

    const response = await database.listDocuments<IPostDoc>(
      databaseId,
      collectionId,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(options.limit),
        Query.offset(options.offset),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getByUserId = async (user_id: string): Promise<IPostDoc[]> => {
  try {
    const response = await database.listDocuments<IPostDoc>(
      databaseId,
      collectionId,
      [Query.equal('user_id', [user_id])]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getById = async (id: string): Promise<IPostDoc> => {
  try {
    const docs = await database.listDocuments<IPostDoc>(
      databaseId,
      collectionId,
      [Query.equal('$id', [id])]
    );
    console.log(docs);
    return docs.documents[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiFilters = async (
  keyword: string,
  stateId: string,
  cityId: string,
  categoryId: string,
  options: IQueryOptions
): Promise<IPostDoc[]> => {
  const filterQueries = [];

  if (stateId) {
    filterQueries.push(Query.equal('state_id', [stateId]));
  }

  if (cityId) {
    filterQueries.push(Query.equal('city_id', [cityId]));
  }

  if (categoryId) {
    filterQueries.push(Query.equal('category_id', [categoryId]));
  }

  if (keyword) {
    filterQueries.push(Query.search('title', keyword));
  }
  console.log({filterQueries});
  if (filterQueries.length > 0) {
    try {
      const response = await database.listDocuments<IPostDoc>(
        databaseId,
        collectionId,
        filterQueries
      );
      return response.documents;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    const response = await getAll(options);
    return response;
  }
};
