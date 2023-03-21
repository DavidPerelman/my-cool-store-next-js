import dbConnect from '@/config/dbConnect';
const User = require('@/models/User');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    dbConnect();

    const { userName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({ error: 'Email already exist' });
    }

    const user = await User.create({ userName, email, password });

    res.status(201).json({ user });
  }
}
