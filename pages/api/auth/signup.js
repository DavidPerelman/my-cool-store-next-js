// import { MongoClient } from 'mongodb';
// import User from '@/models/User';
// import { signup } from '@/lib/mongo/auth';

import { hashPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const { userName, email, password } = req.body;
//       const { user, error } = await signup(userName, email, password);
//       if (error) throw new Error(error);

//       console.log(user);
//       return res.status(200).json({ user });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   res.setHeader('Allow', ['POST']);
//   res.status(425).end(`Method ${req.method} is not allowed.`);
// }

async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, email, password } = req.body;

    console.log(userName, email, password);
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
