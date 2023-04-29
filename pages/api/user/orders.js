import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);

    try {
      const mongoClient = await clientPromise;

      const db = mongoClient.db('myFirstDatabase');

      const collection = db.collection('orders');

      const results = await collection
        .find({
          user: session.user._id,
        })
        .toArray();

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
}
