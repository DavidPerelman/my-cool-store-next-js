export async function loadProducts() {
  const res = await fetch(`${process.env.DB_HOST}/api/products`);
  const data = await res.json();

  return data;
}

export async function loadProduct(productId) {
  const res = await fetch(`${process.env.DB_HOST}/api/products/${productId}`);
  const data = await res.json();

  return data;
}
