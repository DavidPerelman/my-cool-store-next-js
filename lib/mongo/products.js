import clientPromise from '.';

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

export async function getProducts() {
  try {
    if (!products) await init();
    const result = await products.find().toArray();
    return { products: result };
  } catch (error) {
    return { error: 'Failed to fetch products!' };
  }
}

export async function getProduct(data) {
  console.log(data.params.productId);
  try {
    if (!products) await init();
    const result = await products.findById(data.params.productId);
    return { product: result };
  } catch (error) {
    return { error: 'Failed to fetch products!' };
  }
}
