import { Databases, Models, Query } from 'appwrite';
import config from '../config';
import client from './client';

export interface IState {
  name: string;
  $id: string;
}

export interface IStateDoc extends IState, Models.Document {}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.states;

export const getAll = async (): Promise<IStateDoc[]> => {
  try {
    const response = await database.listDocuments<IStateDoc>(
      databaseId,
      collectionId
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getById = async (id: string): Promise<IStateDoc> => {
  try {
    const docs = await database.listDocuments<IStateDoc>(
      databaseId,
      collectionId,
      [Query.equal('$id', [id])]
    );
    return docs.documents[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
