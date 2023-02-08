import { useRouter } from 'next/router';

function ProductDetail(params) {
  const router = useRouter();
  const productId = router.query.productId;

  console.log(productId);

  return <h1>{productId}</h1>;
}

export default ProductDetail;
