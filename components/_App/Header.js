import { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Hamburger from '../UI/Hamburger/Hamburger';
import Icon from '../UI/Icon/Icon';
import classes from './Header.module.css';
import nProgress from 'nprogress';
import CartContext from '@/context/cart-context';
import CartModal from '../Layout/CartModal/CartModal';
import UserModal from '../Layout/UserModal/UserModal';
import AuthContext from '@/context/auth-context';
import { useRouter } from 'next/router';
import SearchBar from '../Layout/SearchBar/SearchBar';
import { useSession } from 'next-auth/react';

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

const Header = ({ categories, products }) => {
  const { data: session, status } = useSession();
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [cartItemsAmount, setCartItemsAmount] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [searchBar, setSearchBar] = useState(null);
  const searchProductsInputRef = useRef();
  const searchCategoriesInputRef = useRef();
  const isLoggedIn = session && status === 'authenticated';
  const router = useRouter();

  const handleSearchBar = (id) => {
    if (searchBar === id || (searchBar && id === undefined)) {
      setSearchBar(null);
    }
    if (searchBar !== id) {
      setSearchBar(id);
    }

    if (id === 'categories') {
      searchProductsInputRef.current.value = '';
    } else {
      searchCategoriesInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handleClick = ({ target }) => {
      handleSearchBar(target.dataset.id);
    };

    document.addEventListener('click', handleClick);

    setShowLinks(false);

    setCartItemsAmount(cartCtx.items.length);
  }, [cartCtx.items.length, router.pathname, handleSearchBar]);

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
            <SearchBar
              searchBarInputRef={searchCategoriesInputRef}
              searchBar={searchBar}
              setSearchBar={setSearchBar}
              id='categories'
              data={categories}
              placeholder='Search Category...'
            />

            <SearchBar
              id='products'
              searchBar={searchBar}
              setSearchBar={setSearchBar}
              searchBarInputRef={searchProductsInputRef}
              data={products}
              placeholder='Search Product...'
            />
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
