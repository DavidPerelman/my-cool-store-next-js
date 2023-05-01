import Head from 'next/head';
import Header from './Header';
import classes from './Header.module.css';

const Layout = ({ pageProps, children }) => {
  return (
    <>
      <Head>
        <title>MyCoolStore</title>
      </Head>
      <Header categories={pageProps.categories} products={pageProps.products} />
      <main style={{ marginTop: '4rem' }} className={classes.main}>
        {children}
      </main>
    </>
  );
};

export default Layout;
