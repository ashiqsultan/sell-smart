import { Databases, ID, Models, Query } from 'appwrite';
import config from '../config';
import client from './client';

export interface IChat {
  user1_id: string;
  user2_id: string;
}
export interface IChatDoc extends IChat, Models.Document {}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.chats;

export const getByUserIds = async (
  userIdA: string,
  userIdB: string
): Promise<string> => {
  try {
    const [user1_id, user2_id] = [userIdA, userIdB].sort();
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.equal('user1_id', [user1_id]),
      Query.equal('user2_id', [user2_id]),
    ]);
    return response.documents[0].$id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (
  userIdA: string,
  userIdB: string
): Promise<string> => {
  try {
    const [user1_id, user2_id] = [userIdA, userIdB].sort();
    const data: IChat = { user1_id, user2_id };
    const response = await database.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );

    return response.documents[0].$id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
