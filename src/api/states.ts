import { Databases } from 'appwrite';
import config from '../config';
import client from './client';

export const getAll = async () => {
  try {
    const database = new Databases(client());
    const databaseId = config.database_id;
    const collectionId = config.collectionIds.states;
    const docs = await database.listDocuments(databaseId, collectionId);
    console.log(docs);
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
