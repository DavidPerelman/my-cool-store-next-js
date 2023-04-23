import App from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.css';
config.autoAddCss = false;
import 'bootstrap/dist/css/bootstrap.min.css';

import 'public/static/styles.css';
import 'public/static/nprogress.css';

import Layout from '@/components/_App/Layout';
import { CartContextProvider } from '@/context/cart-context';
import { AuthContextProvider } from '@/context/auth-context';
import { SessionProvider } from 'next-auth/react';
import { OrderContextProvider } from '@/context/order-context';

// MyApp.getInitialProps = async (ctx) => {
//   const productsRes = await fetch('http://localhost:3000/api/products');
//   const categoriesRes = await fetch('http://localhost:3000/api/categories');

//   const productsJson = await productsRes.json();
//   const categoriesJson = await categoriesRes.json();

//   return {
//     products: productsJson.products,
//     categories: categoriesJson.categories,
//   };
// };

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  products,
  categories,
}) {
  return (
    <SessionProvider session={session}>
      <OrderContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Layout products={products} categories={categories}>
              <Component {...pageProps} />
            </Layout>
          </CartContextProvider>
        </AuthContextProvider>
      </OrderContextProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`

  const productsRes = await fetch('http://localhost:3000/api/products');
  const categoriesRes = await fetch('http://localhost:3000/api/categories');

  const productsJson = await productsRes.json();
  const categoriesJson = await categoriesRes.json();

  return {
    ...pageProps,
    products: productsJson,
    categories: categoriesJson,
  };
};
