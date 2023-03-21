import { connectToDatabase } from '@/lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const client = await connectToDatabase();

    const db = client.db();

    const user = await db.collection('users').findOne({ email: email });
    const userId = user._id.toString();

    if (!user) {
      res.status(401).json({ message: 'Not authenticated!' });
      client.close();
      return;
    }

    const orders = await db
      .collection('orders')
      .find({ user: userId })
      .toArray();

    res.status(201).json({ orders });
    client.close();
  }
}

export default handler;
