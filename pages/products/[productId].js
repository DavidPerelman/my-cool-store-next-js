import { getProducts } from '@/lib/mongo/products';
import { getProduct } from '@/lib/mongo/product';
import { useState, useEffect } from 'react';

export async function getStaticPaths() {
  const products = await getProducts();

  const paths = products.products.map((product) => {
    return {
      params: { productId: product._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const res = await getProduct(productId);

  return {
    props: {
      product: res.product,
    },
  };
}

export default function ProductDetail({ product }) {
  const [productObj, setProductObj] = useState({});

  useEffect(() => {
    setProductObj(JSON.parse(product));
  }, [product]);

  console.log(JSON.parse(product));
  return <h1>{productObj.title}</h1>;
}
