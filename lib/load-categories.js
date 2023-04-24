export async function loadCategories() {
  const res = await fetch(`${process.env.DB_HOST}/api/categories`);
  const data = await res.json();

  return data;
}

export async function loadProductsByCategory(categoryId) {
  const res = await fetch(
    `${process.env.DB_HOST}/api/categories/${categoryId}`
  );
  const data = await res.json();

  return data;
}
