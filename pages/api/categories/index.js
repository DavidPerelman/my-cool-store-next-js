import { getCategories } from '@/lib/mongo/categories';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { categories, error } = await getCategories();
      if (error) throw new Error(error);

      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
