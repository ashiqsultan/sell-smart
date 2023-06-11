import { Databases, Models } from 'appwrite';
import config from '../config';
import client from './client';

export interface ICategory {
  name: string;
  $id: string;
}
export interface ICategoryDoc extends ICategory, Models.Document {}
const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.categories;

export const getAll = async (): Promise<ICategoryDoc[]> => {
  try {
    const response = await database.listDocuments<ICategoryDoc>(
      databaseId,
      collectionId
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
