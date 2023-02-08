import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Hamburger from '../UI/Hamburger/Hamburger';
import Icon from '../UI/Icon/Icon';
import classes from './Header.module.css';
import nProgress from 'nprogress';
import CartContext from '@/context/cart-context';

nProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => {
  nProgress.start();
};

Router.onRouteChangeComplete = () => {
  nProgress.done();
};

Router.onRouteChangeError = function () {
  NProgress.done();
};

const Header = () => {
  const cartCtx = useContext(CartContext);
  const [cartItemsAmount, setCartItemsAmount] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    setCartItemsAmount(cartCtx.items.length);
  }, [cartCtx.items.length]);

  return (
    <div className='d-flex flex-column site-container'>
      <div className={classes.MyNavbar}>
        <div className={classes['left-side']}>
          <Link className={classes['site-title']} href='/'>
            MyCoolStore
          </Link>
        </div>
        <div className={classes['right-side']}>
          <div
            className={classes.links}
            id={showLinks ? classes['hidden'] : ''}
          ></div>
          <div className={classes.icons}>
            <Icon
              type={'cart-shopping'}
              size='2xl'
              color='white'
              amount={cartItemsAmount}
            />
            <Icon type={'user'} size='2xl' color='white' />
          </div>
          <div className={classes.Hamburger}>
            <Hamburger showLinks={showLinks} setShowLinks={setShowLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
