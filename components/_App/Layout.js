import Head from 'next/head';

import Header from './Header';
import HeadContent from './HeadContent';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
