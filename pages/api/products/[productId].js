import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(req.query);
    try {
      const mongoClient = await clientPromise;

      const db = mongoClient.db('myFirstDatabase');

      const collection = db.collection('products');

      const results = await collection
        .find({
          _id: new ObjectId(req.query.productId),
        })
        .toArray();

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
}
