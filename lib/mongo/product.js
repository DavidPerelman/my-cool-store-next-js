import clientPromise from '.';
import { ObjectId } from 'mongodb';

let client;
let db;
let products;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    products = await db.collection('products');
  } catch (error) {
    throw new Error('Add Mongo URI to .env.local');
  }
}

(async () => {
  await init();
})();

export async function getProduct(productId) {
  try {
    if (!products) await init();
    const result = await products.findOne({ _id: new ObjectId(productId) });
    const product = JSON.stringify(result);
    return { product: product };
  } catch (error) {
    return { error: 'Failed to fetch products!' };
  }
}
