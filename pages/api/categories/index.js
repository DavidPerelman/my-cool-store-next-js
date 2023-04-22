import { connectToDatabase } from '@/lib/db';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectToDatabase();

    const db = client.db();

    const categories = await db.collection('categories').find().toArray();

    res.status(201).json({ categories });
    client.close();
  }
};

export default handler;
