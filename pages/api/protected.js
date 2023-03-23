import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import Nextauth from './auth/[...nextauth]';

async function handler(req, res) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  if (token) {
    // Signed in
    console.log(token._id);
  } else {
    // Not Signed in
    res.status(401);
  }

  res.status(201).json({ message: 'hello from protected' });
}

export default handler;
