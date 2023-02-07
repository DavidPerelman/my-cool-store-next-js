import React, { useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const url = 'http://localhost:3000/api/products';
    axios.get(url);
    console.log('getProducts');
  };

  return (
    <>
      <Head>
        <title>MyCoolStore</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Home</h1>
    </>
  );
}
