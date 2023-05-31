import { Client } from 'appwrite';

const env = {
  endpoint: 'https://cloud.appwrite.io/v1',
  project: 'demo_project',
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
