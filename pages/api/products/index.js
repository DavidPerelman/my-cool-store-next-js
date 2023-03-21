import { connectDatabase, getAllDocuments } from '@/helpers/db-util';
import { getProducts } from '@/lib/mongo/products';
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

// const handler = async (req, res) => {
//   let client;

//   try {
//     client = await connectDatabase();
//   } catch (error) {
//     res.status(500).json({ message: 'Connecting to the database failed!' });
//     return;
//   }
//   if (req.method === 'GET') {
//     try {
//       const documents = await getAllDocuments(client, 'products', {
//         _id: -1,
//       });
//       res.status(200).json({ products: documents });
//     } catch (error) {
//       res.status(500).json({ message: 'Getting comments failed!' });
//     }
//   }
// };

async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db('nextjs-mongodb-demo');

  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection('posts').insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case 'GET':
      const allPosts = await db.collection('allPosts').find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}

export default handler;
