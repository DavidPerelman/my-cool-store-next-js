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

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <OrderContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Layout
              products={pageProps.products}
              categories={pageProps.categories}
            >
              <Component {...pageProps} />
            </Layout>
          </CartContextProvider>
        </AuthContextProvider>
      </OrderContextProvider>
    </SessionProvider>
  );
}
