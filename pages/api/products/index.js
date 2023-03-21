import { connectToDatabase } from '@/lib/db';

async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await connectToDatabase();

    const db = client.db();

    const products = await db.collection('products').find().toArray();

    res.status(201).json({ products });
    client.close();
  }
}

export default handler;
