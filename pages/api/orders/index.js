import { connectToDatabase } from '@/lib/db';

async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await connectToDatabase();

    const db = client.db();

    const orders = await db.collection('orders').find().toArray();

    res.status(201).json({ orders });
    client.close();
  }
}

export default handler;
