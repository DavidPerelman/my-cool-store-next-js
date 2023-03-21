const { MongoClient } = require('mongodb');

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  return client;
}
