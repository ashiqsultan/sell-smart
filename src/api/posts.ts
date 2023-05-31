import { Databases, Query, ID } from 'appwrite';
import config from '../config';
import client from './client';
import { getInfo } from './account';

interface IPost {
  user_id: string;
  category_id: string;
  title: string;
  price: number;
  state_id: string;
  city_id: string;
  description?: string;
}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.posts;

export const getAll = async () => {
  try {
    const response = await database.listDocuments(databaseId, collectionId);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const filterByState = async (stateId: string) => {
  try {
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.equal('state_id', [stateId]),
    ]);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const filterByStateCity = async (stateId: string, cityId: string) => {
  try {
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.equal('state_id', [stateId]),
      Query.equal('city_id', [cityId]),
    ]);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const filterTitle = async (keyword: string) => {
  try {
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.search('title', keyword),
    ]);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const filterTitleState = async (keyword: string, stateId: string) => {
  try {
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.search('title', keyword),
      Query.equal('state_id', [stateId]),
    ]);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const filterTitleStateCity = async (
  keyword: string,
  stateId: string,
  cityId: string
) => {
  try {
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.search('title', keyword),
      Query.equal('state_id', [stateId]),
      Query.equal('city_id', [cityId]),
    ]);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (
  category_id: string,
  title: string,
  price: number,
  state_id: string,
  city_id: string,
  description: string
) => {
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
    };

    const result: IPost = database.createDocument(
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
