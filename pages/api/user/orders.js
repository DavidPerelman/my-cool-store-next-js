import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);

    console.log(session);
    if (!session) {
      console.log('You must be logged in.');
      res.status(401).json({ message: 'You must be logged in.' });
    }

    try {
      const mongoClient = await clientPromise;

      const db = mongoClient.db('myFirstDatabase');

      const collection = db.collection('orders');

      const results = await collection
        .find({
          user: session.user._id,
        })
        .toArray();

      console.log(results);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
}
