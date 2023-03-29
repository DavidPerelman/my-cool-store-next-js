import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  const { orderId } = req.query;

  const session = await getSession({ req });

  if (session) {
    if (req.method === 'GET') {
      const client = await connectToDatabase();

      const db = client.db();

      const order = await db
        .collection('orders')
        .find({
          _id: new ObjectId(orderId),
        })
        .toArray();

      if (order.user !== session.user._id) {
        res.status(401).json({
          error:
            'You must be signed in to view the protected content on this page.',
        });
        client.close();
      }

      res.status(201).json({ order });
      client.close();
    }
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
}

export default handler;
