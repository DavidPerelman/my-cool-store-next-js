import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(req.query);
    try {
      const mongoClient = await clientPromise;

      const db = mongoClient.db('myFirstDatabase');

      const categoriesCollection = db.collection('categories');
      const productsCollection = db.collection('products');

      const category = await categoriesCollection
        .find({
          _id: new ObjectId(req.query.categoryId),
        })
        .toArray();

      const products = await productsCollection
        .find({
          category: new ObjectId(req.query.categoryId),
        })
        .toArray();

      res.status(200).json({ category, products });
    } catch (error) {
      console.error(error);
    }
  }
}
