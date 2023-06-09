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
export const getFileById = async (fileId: string): Promise<URL> => {
  try {
    const result = storage.getFilePreview(bucketId, fileId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFile = async (fileId: string): Promise<void> => {
  try {
    await storage.deleteFile(bucketId, fileId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadFilesPromise = async (files: File[]) => {
  try {
    const promises: Array<Promise<string>> = files.map((file) => upload(file));
    const uploadedFileIds = await Promise.all(promises);
    return uploadedFileIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
