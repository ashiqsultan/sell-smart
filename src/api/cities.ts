import { Databases, Query, Models } from 'appwrite';
import config from '../config';
import client from './client';

export interface ICity {
  $id: string;
  state_id: string;
  name: string;
}
export interface ICityDoc extends ICity, Models.Document {}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.cities;

export const getByStateId = async (stateId: string): Promise<ICityDoc[]> => {
  try {
    const docs = await database.listDocuments<ICityDoc>(
      databaseId,
      collectionId,
      [Query.equal('state_id', [stateId])]
    );
    return docs.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getById = async (id: string): Promise<ICityDoc> => {
  try {
    const docs = await database.listDocuments<ICityDoc>(
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
