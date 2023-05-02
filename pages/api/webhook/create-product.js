import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const products = JSON.parse(req.body);
  if (req.method === 'POST') {
    try {
      const mongoClient = await clientPromise;

      const db = mongoClient.db('myFirstDatabase');

      const collection = db.collection('products');

      for (let i = 0; i < products.length; i++) {
        const stripe_product = await stripe.products.create({
          name: products[i].title,
          default_price_data: {
            unit_amount: products[i].price * 100,
            currency: 'usd',
          },
          images: products[i].thumbnail.split(),
          expand: ['default_price'],
        });

        const product = await collection.updateOne(
          {
            _id: new ObjectId(products[i]._id),
          },
          {
            $set: {
              stripe_id: stripe_product.default_price.id,
            },
          }
        );
      }

      return res.status(200).json({ msg: 'success' });
    } catch (error) {
      console.error(error);
    }
  }
}
