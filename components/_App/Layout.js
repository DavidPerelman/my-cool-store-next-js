import React from 'react';
import Head from 'next/head';

import Header from './Header';
import classes from './Header.module.css';

const Layout = ({ children, data }) => {
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
      </Head>
      <Header categories={data.categories} products={data.products} />
      <main style={{ marginTop: '4rem' }} className={classes.main}>
        {children}
      </main>
    </>
  );
};

export default Layout;
