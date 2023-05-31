import { Databases, Query } from 'appwrite';
import config from '../config';
import client from './client';

export interface ICity {
  $id: string;
  state_id: string;
  name: string;
}
const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.cities;

export const getByStateId = async (stateId: string): Promise<ICity[]> => {
  try {
    const docs = await database.listDocuments(databaseId, collectionId, [
      Query.equal('state_id', [stateId]),
    ]);
    return docs.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
