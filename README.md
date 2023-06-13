# Sell Smart - An Online Marketplace with Real-Time Chats and Auto Content Cleaning

This project is a submission for the [Appwrite](https://appwrite.io) [Hashnode](https://hashnode.com) Hackathon.

## Tech Stack

- React.js
- Appwrite Cloud
  - Authentication
  - Database
  - Storage
  - Realtime
  - Cloud Functions (Node.js)
  - Events

### TypeScript
The codebase utilizes Appwrite's dependencies to implement Model Document Interfaces.

Here's how you can simply create an interface for your appwrite collection
```
export interface IPost {
  user_id: string;
  title: string;
  description: string;
  image_ids: string[];
}
export interface IPostDoc extends IPost, Models.Document {}

```

## Project Structure

```
src/
    config.ts
    components/
        Login.tsx
        Chats.tsx
        ...
    api/
        client.ts
        posts.ts
        accounts.ts
        categories.ts
        chats.ts
        ...
```

- All Appwrite-related code is located inside the `api` folder.
- The `api` folder contains one file per DB collection or Storage bucket.
- Each file exports functions to interact with its respective collection, such as getById, create, etc.
- All functions return an interface that extends Appwrite's `Model.Document` type.
- The `client.ts` file is a singleton module that exports the Appwrite Client.
- The `config.ts` file contains all the collection IDs and Storage bucket IDs required by the app in one place.

This codebase serves as a comprehensive reference for building Appwrite projects using React, as it covers most of the services provided by Appwrite.