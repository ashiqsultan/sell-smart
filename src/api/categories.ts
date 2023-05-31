import { Databases } from 'appwrite';
import config from '../config';
import client from './client';

export interface ICategory {
  name: string;
  $id: string;
}
const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.categories;

export const getAll = async (): Promise<ICategory[]> => {
  try {
    const response = await database.listDocuments(databaseId, collectionId);
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
