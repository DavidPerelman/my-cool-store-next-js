import AuthContext from '@/context/auth-context';
import Link from 'next/link';
import React, { useContext } from 'react';
import Button from '../../UI/Button/Button';
import classes from './LoggedInLayout.module.css';

const LoggedInLayout = ({ onCloseUserModal }) => {
  const authCtx = useContext(AuthContext);
  const displayName = 'name';

  console.log(authCtx.currentUser);

  const onMyOrdersHandler = () => {
    authCtx.hideUserModal();
    // navigate(`/my-orders`);
  };

  const onEditProfileHandler = () => {
    authCtx.hideUserModal();
    // navigate(`/profile-setting`);
  };

  const onLogoutHandler = () => {
    authCtx.logout();
    authCtx.hideUserModal();

    // navigate(`/`);
  };

  return (
    <div className={classes.LoggedInLayout}>
      <h1>Hello {displayName !== null ? displayName : ''}!</h1>
      <Button className={classes.button} background='#540d83' color='white'>
        <Link href={`/orders/user/${authCtx.currentUser}`} legacyBehavior>
          <a className={classes['buttons-link']}>My Orders</a>
        </Link>
      </Button>

      <Button
        onClick={onMyOrdersHandler}
        className={classes.button}
        background='#540d83'
        color='white'
      >
        My Orders
      </Button>
      <Button
        onClick={onEditProfileHandler}
        className={classes.button}
        background='#540d83'
        color='white'
      >
        Profile Setting
      </Button>
      <Button
        className={classes.button}
        background='#540d83'
        color='white'
        onClick={onLogoutHandler}
      >
        Logout
      </Button>
      <Button
        className={classes.button}
        background='#540d83'
        color='white'
        onClick={onCloseUserModal}
      >
        Close
      </Button>
    </div>
  );
};

export default LoggedInLayout;
