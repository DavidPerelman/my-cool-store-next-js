import { getProduct } from '@/lib/mongo/products';
import { useRouter } from 'next/router';

export default function ProductDetail(props) {
  console.log(props);
  const router = useRouter();
  const productId = router.query.productId;

  return <h1>{productId}</h1>;
}

export async function getStaticPaths(productId) {
  return {
    paths: [
      // String variant:
      '/products/productId',
      // Object variant:
      { params: { productId: `${productId}` } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(productId) {
  const product = await getProduct(productId);

  return {
    props: {
      // products: products.products.map((product) => ({
      //   _id: product._id.toString(),
      //   title: product.title,
      //   price: product.price,
      //   description: product.description,
      //   brand: product.brand,
      //   category: product.category.toString(),
      //   thumbnail: product.thumbnail,
      // })),
    },
    revalidate: 1,
  };
}
