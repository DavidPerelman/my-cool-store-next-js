import React from 'react';
import Head from 'next/head';

import Header from './Header';
import classes from './Header.module.css';

const Layout = ({ children, categories, products }) => {
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
      </Head>
      <Header categories={categories} products={products} />
      <main style={{ marginTop: '4rem' }} className={classes.main}>
        {children}
      </main>
    </>
  );
};

export default Layout;
