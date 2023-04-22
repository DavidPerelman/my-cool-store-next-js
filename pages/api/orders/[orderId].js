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

      let productsData = [];

      for (let i = 0; i < updateOrderData.products.length; i++) {
        productsData.push({
          _id: updateOrderData.products[i]._id,
          product: new ObjectId(updateOrderData.products[i].product),
          totalPrice: updateOrderData.products[i].totalPrice,
          productQuantity: updateOrderData.products[i].productQuantity,
        });
      }

      const client = await connectToDatabase();

      const db = client.db();

      const order = await db.collection('orders').updateOne(
        {
          _id: new ObjectId(orderId),
        },
        {
          $set: {
            totalPayment: updateOrderData.totalPayment,
            products: productsData,
          },
        }
      );

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
