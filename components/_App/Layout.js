import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Header from './Header';
import classes from './Header.module.css';

const Layout = ({ children, products, categories }) => {
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
