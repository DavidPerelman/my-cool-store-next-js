// import { getProducts } from '@/lib/mongo/products';
// import { getProduct } from '@/lib/mongo/product';
import { useState, useEffect } from 'react';
import { getCategories, getCategory } from '@/lib/mongo/categories';

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.categories.map((category) => {
    return {
      params: { categoryId: category._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const categoryId = context.params.categoryId;
  const res = await getCategory(categoryId);

  return {
    props: {
      category: res.category,
    },
  };
}

export default function CategoryProductsPage({ category }) {
  const [categoryObj, setCategoryObj] = useState({});

  useEffect(() => {
    setCategoryObj(JSON.parse(category));
  }, [category]);

  return <h1>{categoryObj.name}</h1>;
}
