import { getUserData } from '@/lib/mongo/auth';

export default async function handler(req, res) {
  try {
    const result = await getUserData();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
