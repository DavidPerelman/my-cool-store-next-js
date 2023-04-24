import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let mongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

export default async function connectToDatabase() {
  try {
    if (mongoClient) {
      return mongoClient;
    }

    mongoClient = await new MongoClient(uri, options).connect();
    console.log('Connected!');

    return { mongoClient };
  } catch (error) {
    console.error(error);
  }
}
