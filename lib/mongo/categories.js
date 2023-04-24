import clientPromise from '.';
import { ObjectId } from 'mongodb';

let client;
let db;
let categories;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    categories = await db.collection('categories');
  } catch (error) {
    throw new Error('Add Mongo URI to .env.local');
  }
}

(async () => {
  await init();
})();

export async function getCategories() {
  try {
    if (!categories) await init();
    const result = await categories.find().toArray();
    return { categories: result };
  } catch (error) {
    return { error: 'Failed to fetch categories!' };
  }
}

export async function getCategory(categoryId) {
  try {
    if (!categories) await init();
    const result = await categories.findOne({
      _id: new ObjectId(categoryId),
    });

    const category = JSON.stringify(result);
    return { category: category };
  } catch (error) {
    return { error: 'Failed to fetch categories!' };
  }
}
