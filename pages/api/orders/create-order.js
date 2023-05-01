import clientPromise from '@/lib/mongodb';
import moment from 'moment-timezone';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    let products = [];

    for (let i = 0; i < data.items.length; i++) {
      products.push({
        product: new ObjectId(data.items[i].product._id),
        totalPrice: data.items[i].product.price,
        productQuantity: data.items[i].amount,
      });
    }

    try {
      if (!session) {
        res.status(401).json({
          message:
            'You must be signed in to view the protected content on this page.',
        });
      } else {
        const mongoClient = await clientPromise;

        const db = mongoClient.db('myFirstDatabase');

        const collection = db.collection('orders');

        const results = await collection.insertOne({
          user: data.userId,
          products: products,
          totalPayment: data.totalAmount,
          isPaid: { isPaid: false },
          isOpen: true,
          status: 'Open',
          created: moment().format('DD/MM/YYYY HH:mm'),
        });

        return res.status(200).json({ order: results, success: true });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false });
    }
  }
}

export default handler;
