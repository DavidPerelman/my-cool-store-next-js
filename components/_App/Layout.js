import React from 'react';
import Head from 'next/head';

import Header from './Header';
import classes from './Header.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
      </Head>
      <Header />
      <main style={{ marginTop: '4rem' }} className={classes.main}>
        {children}
      </main>
    </>
  );
};

export default Layout;
