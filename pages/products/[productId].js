import Layout from '@/components/_App/Layout';
import { useRouter } from 'next/router';

export default function ProductDetail(params) {
  const router = useRouter();
  const productId = router.query.productId;

  return <h1>{productId}</h1>;
}
