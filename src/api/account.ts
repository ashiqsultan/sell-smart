import { Account, ID } from 'appwrite';
import client from './client';

const account = new Account(client());

export const createAccount = async (email: string, password: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password);
    return newAccount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await account.createEmailSession(email, password);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInfo = async () => {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await account.deleteSession('current');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
