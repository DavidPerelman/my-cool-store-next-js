const { MongoClient } = require('mongodb');

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URI);

  return client;
}
