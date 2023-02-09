import clientPromise from '@/lib/mongodb';

export const fetchDbData = async () => {
  const { db } = await clientPromise();
  const data = await db.collection('categories').find({}).limit(10).toArray();
  return JSON.parse(JSON.stringify(data));
};

export default async (req, res) => {
  const data = await fetchDbData();
  res.status(200).json(data);
};
