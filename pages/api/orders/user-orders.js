import { connectToDatabase } from '@/lib/db';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === 'GET') {
      const client = await connectToDatabase();

      const db = client.db();

      const orders = await db
        .collection('orders')
        .find({ user: session.user._id })
        .toArray();

      res.status(201).json({ orders });
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
