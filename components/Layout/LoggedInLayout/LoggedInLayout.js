import AuthContext from '@/context/auth-context';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Button from '../../UI/Button/Button';
import classes from './LoggedInLayout.module.css';

const LoggedInLayout = ({ onCloseUserModal }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const onMyOrdersHandler = () => {
    onCloseUserModal();
    router.replace(`/users/orders`);
  };

  const onEditProfileHandler = () => {
    onCloseUserModal();
    router.replace(`/users/profile`);
  };

  const logoutHandler = () => {
    signOut();
    onCloseUserModal();

    // navigate(`/`);
  };

  return (
    <div className={classes.LoggedInLayout}>
      <h1>Hello {session.user.name}!</h1>
      {/* <Button className={classes.button} background='#540d83' color='white'>
        <Link href={`/orders/user/${authCtx.currentUser}`} legacyBehavior>
          <a className={classes['buttons-link']}>My Orders</a>
        </Link>
      </Button> */}

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
        onClick={logoutHandler}
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
