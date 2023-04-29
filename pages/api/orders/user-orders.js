import clientPromise from '@/lib/mongodb';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    try {
      if (!session) {
        res.status(401).json({
          message:
            'You must be signed in to view the protected content on this page.',
        });
      } else {
        const mongoClient = await clientPromise;

        const db = mongoClient.db('myFirstDatabase');

        const collection = db.collection('orders');

        const results = await collection
          .find({
            user: session.user._id,
          })
          .toArray();

        res.status(200).json(results);

        // if (results[0].user !== session.user._id) {
        //   res.status(401).json({
        //     message:
        //       'You must be signed in to view the protected content on this page.',
        //   });
        // } else {
        //   res.status(200).json(results);
        // }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default handler;
