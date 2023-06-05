import { Databases, ID, Models, Query } from 'appwrite';
import config from '../config';
import client from './client';

export interface IChat {
  user1_id: string;
  user2_id: string;
  last_message_id?: string;
}
export interface IChatDoc extends IChat, Models.Document {}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.chats;

let currentChatIdSubscription: any;

export const getById = async (chatId: string): Promise<IChatDoc> => {
  const chat = await database.listDocuments<IChatDoc>(
    databaseId,
    collectionId,
    [Query.equal('$id', [chatId])]
  );
  return chat.documents[0];
};

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
    if (Array.isArray(response.documents) && response?.documents[0]?.$id) {
      return response.documents[0].$id;
    }
    return '';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (
  userIdA: string,
  userIdB: string
): Promise<IChatDoc> => {
  try {
    const [user1_id, user2_id] = [userIdA, userIdB].sort();
    const data: IChat = { user1_id, user2_id };
    const response = await database.createDocument<IChatDoc>(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateLastMsgId = async (chatId: string, lastMsgId: string) => {
  try {
    const response = await database.updateDocument(
      databaseId,
      collectionId,
      chatId,
      { last_message_id: lastMsgId }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const subscribeToChatId = (chatId: string) => {
  //  TODO
  //  Call unSubscribeToChatId before creating new one
  const channel = `databases.[${databaseId}].collections.[${collectionId}].documents.[${chatId}]`;
  currentChatIdSubscription = client().subscribe([channel], (response) => {
    console.log(`${channel} response`);
    console.log(response);
  });
  console.log('typeof currentChatIdSubscription');
  console.log(typeof currentChatIdSubscription);
};
export const unSubscribeToChatId = () => {
  currentChatIdSubscription();
};

export const getOrCreateChatIdByIds = async (
  userIdA: string,
  userIdB: string
): Promise<string> => {
  const chatId = await getByUserIds(userIdA, userIdB);
  if (chatId) {
    console.log('Chat found');

    return chatId;
  } else {
    const newChat = await create(userIdA, userIdB);
    console.log('New chat created');
    return newChat.$id;
  }
};
