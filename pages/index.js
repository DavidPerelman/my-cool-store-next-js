import Head from 'next/head';
import CategoryContainer from '@/components/Layout/CategoryContainer/CategoryContainer';
// import { getProducts } from '@/lib/mongo/products';
import { getCategories } from '@/lib/mongo/categories';
import { useSession } from 'next-auth/react';

export default function Home({ categories, products }) {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {categories.map((category, i) => (
        <CategoryContainer category={category} products={products} key={i} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const productsResponse = await fetch('http://localhost:3000/api/products');
  // const products = await getProducts();
  const categories = await getCategories();

  const data = await productsResponse.json();

  return {
    props: {
      categories: categories.categories.map((category) => ({
        _id: category._id.toString(),
        name: category.name,
      })),
      products: data.products.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        price: product.price,
        description: product.description,
        brand: product.brand,
        category: product.category.toString(),
        thumbnail: product.thumbnail,
      })),
    },
    revalidate: 1,
  };
}
