import Head from 'next/head';

import Header from './Header';
import HeadContent from './HeadContent';
import classes from './Header.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
      </Head>
      <Header />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
