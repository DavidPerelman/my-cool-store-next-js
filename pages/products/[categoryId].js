import { useRouter } from 'next/router';

export default function ProductsCategoryPage() {
  const router = useRouter();
  const categoryId = router.query.categoryId;

  return <h1>{categoryId}</h1>;
}
