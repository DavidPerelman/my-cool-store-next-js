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

export default function MyApp({ Component, pageProps }) {
  // if (Component.getLayout) {
  //   return Component.getLayout(
  //     <AuthContextProvider>
  //       <CartContextProvider>
  //         {/* <Layout> */}
  //         <Component {...pageProps} />
  //         {/* </Layout> */}
  //       </CartContextProvider>
  //     </AuthContextProvider>
  //   );
  // }

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
