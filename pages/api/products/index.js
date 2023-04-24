import { connectToDatabase } from '@/lib/db';

import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const mongoClient = await clientPromise;

      const db = mongoClient.db('myFirstDatabase');

      const collection = db.collection('products');

      const results = await collection.find({}).toArray();

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
}
