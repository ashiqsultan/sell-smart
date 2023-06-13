import { Client } from 'appwrite';
import config from '../config';

const env = {
  endpoint: 'https://cloud.appwrite.io/v1',
  project: config.project_id,
};

let client: Client | null = null;

export default () => {
  if (client) {
    return client;
  }
  client = new Client();
  client.setEndpoint(env.endpoint).setProject(env.project);
  return client;
};
