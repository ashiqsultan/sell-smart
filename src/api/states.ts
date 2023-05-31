import { Databases } from 'appwrite';
import config from '../config';
import client from './client';

export interface IState {
  name: string;
  $id: string;
}
const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.states;

export const getAll = async (): Promise<IState[]> => {
  try {
    const response = await database.listDocuments(databaseId, collectionId);
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
