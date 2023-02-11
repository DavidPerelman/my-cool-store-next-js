import { getProducts } from '@/lib/mongo/products';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { products, error } = await getProducts();
      if (error) throw new Error(error);

      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
