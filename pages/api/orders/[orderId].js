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

      const order_order = await db
        .collection('orders')
        .aggregate([
          {
            $match: { _id: new ObjectId(orderId) },
          },
          {
            $unwind: '$products',
          },
          {
            $lookup: {
              from: 'products',
              localField: 'products.product',
              foreignField: '_id',
              as: 'products.product',
            },
          },
          {
            $unwind: '$products.product',
          },
          {
            $group: {
              _id: '$_id',
              totalPayment: { $first: '$totalPayment' },
              user: { $first: '$user' },
              orderNumber: { $first: '$orderNumber' },
              isPaid: { $first: '$isPaid' },
              isOpen: { $first: '$isOpen' },
              status: { $first: '$status' },
              created: { $first: '$created' },
              products: {
                $push: {
                  productQuantity: '$products.productQuantity',
                  totalPrice: '$products.totalPrice',
                  _id: '$products._id',
                  product: '$products.product',
                },
              },
            },
          },
        ])
        .toArray();

      // console.log(order_order[0].products);

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

      res.status(201).json({ order_order });
      client.close();
    }
    if (req.method === 'PUT') {
      const { orderId } = req.query;
      const updateOrderData = JSON.parse(req.body);

      const client = await connectToDatabase();

      const db = client.db();

      const order = await db
        .collection('orders')
        .find({
          _id: new ObjectId(orderId),
        })
        .toArray();

      // const order = await db.collection('orders').updateOne(
      //   {
      //     _id: new ObjectId(orderId),
      //   },

      //   {
      //     $set: { totalPayment: updateOrderData.totalPayment },
      //     // $currentDate: { lastModified: true },
      //   }
      // );

      // for (let i = 0; i < updateOrderData.products.length; i++) {
      //   for (let x = 0; x < order.length; x++) {
      //     console.log(
      //       order[x].products[i]._id.toString() ===
      //         updateOrderData.products[i]._id
      //     );
      //   }
      // }

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
