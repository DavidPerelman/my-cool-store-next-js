import { connectToDatabase } from '@/lib/db';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const client = await connectToDatabase();

    const db = client.db();

    const user = await db.collection('users').findOne({ email: email });

    if (!user) {
      res.status(401).json({ message: 'Not authenticated!' });
      client.close();
      return;
    }

    res.status(201).json({ user });
    client.close();
  }
}

export default handler;
