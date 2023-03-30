import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

async function handler(req, res) {
  const { orderId } = req.query;

  const session = await getSession({ req });

  if (session) {
    if (req.method === 'GET') {
      const client = await connectToDatabase();

      const db = client.db();

      const order = await db
        .collection('orders')
        .find({
          _id: new ObjectId(orderId),
        })
        .toArray();

      let productsOrder = [];
      let product;

      for (let i = 0; i < order.length; i++) {
        for (let x = 0; x < order[i].products.length; x++) {
          const productId = order[i].products[x].product.toString();

          product = await db
            .collection('products')
            .find({ _id: new ObjectId(`${productId}`) })
            .toArray();

          productsOrder.push(product[0]);
        }

        for (let y = 0; y < order[0].products.length; y++) {
          productsOrder.forEach((product) => {
            if (
              product._id.toString() === order[0].products[y].product.toString()
            ) {
              order[0].products[y].product = product;
            }
          });
        }
      }

      if (order[0].user !== session.user._id) {
        res.status(401).json({
          error:
            'You must be signed in to view the protected content on this page.',
        });
        client.close();
      }

      res.status(201).json({ order });
      client.close();
    }
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
}

export default handler;
