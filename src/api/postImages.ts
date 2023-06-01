import { Storage, ID, Models } from 'appwrite';
import config from '../config';
import client from './client';

const storage = new Storage(client());
const bucketId = config.buckets.post_images;

export const upload = async (file: File): Promise<string> => {
  try {
    const result = await storage.createFile(bucketId, ID.unique(), file);
    return result.$id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getFileById = async (fileId: string): Promise<Models.File> => {
  try {
    const result = await storage.getFile(bucketId, fileId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
