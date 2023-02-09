import Layout from '@/components/_App/Layout';
import { useRouter } from 'next/router';
// import { MongoClient } from 'mongodb';

export default function ProductDetail(params) {
  const router = useRouter();
  const productId = router.query.productId;

  console.log(productId);

  return <h1>{productId}</h1>;
}
