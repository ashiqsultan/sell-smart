import { Databases, ID, Models, Query } from 'appwrite';
import config from '../config';
import client from './client';
import { getInfo } from './account';
import { updateLastMsgId } from './chats';

export interface IMessage {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
}

export interface IMessageDoc extends IMessage, Models.Document {}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.messages;

export const getByChatId = async (chatId: string): Promise<IMessageDoc[]> => {
  try {
    const response = await database.listDocuments<IMessageDoc>(
      databaseId,
      collectionId,
      [Query.equal('chat_id', [chatId]), Query.orderDesc('$createdAt')]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (
  chat_id: string,
  receiver_id: string,
  content: string
): Promise<IMessageDoc> => {
  try {
    const user = await getInfo();
    const sender_id = user.$id;
    const data: IMessage = {
      chat_id,
      sender_id,
      receiver_id,
      content,
    };
    const response = await database.createDocument<IMessageDoc>(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
    await updateLastMsgId(chat_id, response.$id);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
