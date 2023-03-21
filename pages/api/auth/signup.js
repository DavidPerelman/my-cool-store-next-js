import { MongoClient } from 'mongodb';
import User from '@/models/User';
import { signup } from '@/lib/mongo/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userName, email, password } = req.body;
      const { user, error } = await signup(userName, email, password);
      if (error) throw new Error(error);

      console.log(user);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
}
