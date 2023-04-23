import Head from 'next/head';
import CategoryContainer from '@/components/Layout/CategoryContainer/CategoryContainer';

export default function Home({ categories, products }) {
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

Home.getInitialProps = async (ctx) => {
  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/products`
  );
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/categories`
  );

  const products = await productsResponse.json();
  const categories = await categoriesResponse.json();

  return { products: products.products, categories: categories.categories };
};
