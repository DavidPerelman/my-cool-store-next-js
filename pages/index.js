import Head from 'next/head';
import CategoryContainer from '@/components/Layout/CategoryContainer/CategoryContainer';

export async function loadProducts() {
  const res = await fetch(`${process.env.DB_HOST}/api/products`);
  const data = await res.json();

  return data;
}

export async function loadCategories() {
  const res = await fetch(`${process.env.DB_HOST}/api/categories`);
  const data = await res.json();

  return data;
}
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

// Home.getInitialProps = async (ctx) => {
//   const productsResponse = await fetch(`${process.env.DB_HOST}/api/products`);
//   const categoriesResponse = await fetch(
//     `${process.env.DB_HOST}/api/categories`
//   );

//   const products = await productsResponse.json();
//   const categories = await categoriesResponse.json();

//   return { products: products, categories: categories };
// };

export async function getStaticProps() {
  const products = await loadProducts();
  const categories = await loadCategories();

  return { props: { products, categories } };
}
