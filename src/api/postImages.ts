import { Storage, ID } from 'appwrite';
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
