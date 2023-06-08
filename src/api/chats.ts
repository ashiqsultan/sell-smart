import { Databases, ID, Models, Query } from 'appwrite';
import config from '../config';
import client from './client';
import * as userDetailsAPI from './userDetails';

export interface IChat {
  user1_id: string;
  user2_id: string;
  last_message_id?: string;
}
export interface IChatDoc extends IChat, Models.Document {}

export interface IUserChats {
  chatId: string;
  receiverName: string;
  updatedAt: string;
}

const database = new Databases(client());
const databaseId = config.database_id;
const collectionId = config.collectionIds.chats;

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

export const getUserChats = async (userId: string): Promise<IUserChats[]> => {
  try {
    const user1Res = database.listDocuments<IChatDoc>(
      databaseId,
      collectionId,
      [Query.equal('user1_id', [userId])]
    );
    const user2Res = database.listDocuments<IChatDoc>(
      databaseId,
      collectionId,
      [Query.equal('user2_id', [userId])]
    );
    const allRes = await Promise.all([user1Res, user2Res]);

    const chats = allRes.flatMap((res) => res.documents); // Flatten the array of chat documents

    const receiverIds = chats.map((chat) =>
      chat.user1_id === userId ? chat.user2_id : chat.user1_id
    );

    const userDetailsPromises = receiverIds.map((receiverId) =>
      userDetailsAPI.getById(receiverId)
    );
    const receiverNames = await Promise.all(userDetailsPromises);

    const chatsWithReceiverNames = chats.map((chat, index) => ({
      chatId: chat.$id,
      receiverId: receiverIds[index],
      receiverName: receiverNames[index].name,
      updatedAt: chat.$updatedAt,
    }));
    return chatsWithReceiverNames;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
