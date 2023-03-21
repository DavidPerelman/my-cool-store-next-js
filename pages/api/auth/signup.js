import { hashPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, email, password } = req.body;

    if (
      !userName ||
      userName.trim().length < 4 ||
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid inputs.' });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user!', result });
    client.close();
  }
}

export default handler;
