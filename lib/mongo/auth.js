import { ObjectId } from 'mongodb';
import clientPromise from '.';

let client;
let db;
let user;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    user = await db.collection('user');
  } catch (error) {
    throw new Error('Add Mongo URI to .env.local');
  }
}

(async () => {
  await init();
})();

export async function getUserData(userId) {
  try {
    if (!user) await init();
    const result = await user.findOne({
      firebaseId: new ObjectId(userId),
    });
    const user = JSON.stringify(result);

    return { user: user };
  } catch (error) {
    return { error: 'Failed to fetch user data!' };
  }
}

export async function getProduct(productId) {
  try {
    if (!products) await init();
    const result = await products.findOne({ _id: new ObjectId(productId) });
    const product = JSON.stringify(result);
    return { product: product };
  } catch (error) {
    return { error: 'Failed to fetch product!' };
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    if (!products) await init();
    const result = await products
      .find({
        category: new ObjectId(categoryId),
      })
      .toArray();

    return { products: result };
  } catch (error) {
    return { error: 'Failed to fetch products!' };
  }
}
