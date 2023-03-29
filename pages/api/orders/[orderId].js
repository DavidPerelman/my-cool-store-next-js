import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  const { orderId } = req.query;

  const session = await getSession({ req });

  if (req.method === 'GET') {
    const client = await connectToDatabase();

    const db = client.db();

    const order = await db
      .collection('orders')
      .find({
        _id: new ObjectId(orderId),
      })
      .toArray();

    res.status(201).json({ order });
    client.close();
  }

  // if (session) {
  //   if (req.method === 'GET') {
  //     const client = await connectToDatabase();

  //     const db = client.db();

  //     const orders = await db
  //       .collection('orders')
  //       .find({ user: session.user._id })
  //       .toArray();

  //     res.status(201).json({ orders });
  //     client.close();
  //   }
  // } else {
  //   res.send({
  //     error:
  //       'You must be signed in to view the protected content on this page.',
  //   });
  // }
}

export default handler;
