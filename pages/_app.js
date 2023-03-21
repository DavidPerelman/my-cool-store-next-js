import App from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.css';
config.autoAddCss = false;
import 'bootstrap/dist/css/bootstrap.min.css';

import '/static/styles.css';
import '/static/nprogress.css';

import Layout from '@/components/_App/Layout';
import { CartContextProvider } from '@/context/cart-context';
import { AuthContextProvider } from '@/context/auth-context';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <CartContextProvider>
          <Layout data={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
