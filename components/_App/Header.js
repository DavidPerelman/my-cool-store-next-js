import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Hamburger from '../UI/Hamburger/Hamburger';
import Icon from '../UI/Icon/Icon';
import classes from './Header.module.css';
import CartContext from '@/context/cart-context';
import CartModal from '../Layout/CartModal/CartModal';
import UserModal from '../Layout/UserModal/UserModal';
import AuthContext from '@/context/auth-context';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import SearchBar from '../Layout/SearchBar/SearchBar/SearchBar';

const Header = ({ categories, products }) => {
  const { data: session, status } = useSession();
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [cartItemsAmount, setCartItemsAmount] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const isLoggedIn = session && status === 'authenticated';
  const router = useRouter();

  useEffect(() => {
    setCartItemsAmount(cartCtx.items.length);
  }, [cartCtx.items.length, router.pathname]);

  const showCartHandler = () => {
    cartCtx.showCart();
  };

  const closeCartHandler = () => {
    cartCtx.hideCart();
  };

  const showUserModalHandler = () => {
    authCtx.showUserModal();
  };

  const closeUserModalHandler = () => {
    authCtx.hideUserModal();
  };

  return (
    <div className='d-flex flex-column site-container'>
      {cartCtx.cartIsShown && <CartModal onCloseCart={closeCartHandler} />}
      {authCtx.userModalIsShown && (
        <UserModal onCloseUserModal={closeUserModalHandler} />
      )}
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
          >
            <div className={classes.searchBar}>
              <SearchBar
                data={categories}
                placeholder='Search Category...'
                id='categories'
                showLinks={showLinks}
                setShowLinks={setShowLinks}
              />
              <SearchBar
                data={products}
                placeholder='Search Product...'
                id='products'
                showLinks={showLinks}
                setShowLinks={setShowLinks}
              />
            </div>
          </div>
          <div className={classes.icons}>
            <Icon
              type={'cart-shopping'}
              size='2xl'
              color='white'
              amount={cartItemsAmount}
              onClick={showCartHandler}
            />
            <Icon
              type={'user'}
              size='2xl'
              color='white'
              isLoggedIn={isLoggedIn}
              onClick={showUserModalHandler}
            />
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
