import { Databases, Query, Models } from 'appwrite';
import config from '../config';
import client from './client';

interface IUserDetails {
  name: string;
  bio?: string;
  phone_number?: string;
}
export interface IUserDetailsDoc extends IUserDetails, Models.Document {}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.user_details;

export const createUserDetail = async (
  userId: string,
  name: string,
  bio: string,
  phone_number: string
): Promise<IUserDetailsDoc> => {
  try {
    const data: IUserDetails = {
      name,
      bio,
      phone_number,
    };
    const userDetail: IUserDetailsDoc =
      await database.createDocument<IUserDetailsDoc>(
        databaseId,
        collectionId,
        userId,
        data
      );
    return userDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getById = async (userId: string): Promise<IUserDetailsDoc> => {
  try {
    const docs = await database.listDocuments<IUserDetailsDoc>(
      databaseId,
      collectionId,
      [Query.equal('$id', [userId])]
    );
    return docs.documents[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
