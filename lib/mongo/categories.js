import clientPromise from '.';

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
