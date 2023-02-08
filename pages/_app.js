import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.css';
// import '@/styles/nprogress.css';
config.autoAddCss = false;
import 'bootstrap/dist/css/bootstrap.min.css';

import '/static/styles.css';
import '/static/nprogress.css';

import Layout from '@/components/_App/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
