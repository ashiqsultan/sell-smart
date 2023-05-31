import { Databases, Query } from 'appwrite';
import config from '../config';
import client from './client';

export const getByStateId = async (stateId: string) => {
  try {
    const database = new Databases(client());
    const databaseId = config.database_id;
    const collectionId = config.collectionIds.cities;
    const docs = await database.listDocuments(databaseId, collectionId, [
      Query.equal('state_id', [stateId]),
    ]);
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
