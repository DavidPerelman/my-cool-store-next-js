import React, { useContext } from 'react';
import CartContext from '@/context/cart-context';
import Modal from '@/components/UI/Modal/Modal';
import classes from './UserModal.module.css';
import AuthContext from '@/context/auth-context';
import AuthForm from '@/components/Auth/AuthForm/AuthForm';
import LoggedInLayout from '../LoggedInLayout/LoggedInLayout';

const UserModal = ({ onCloseUserModal }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.authorized;

  return (
    <Modal onClose={onCloseUserModal}>
      {isLoggedIn && <LoggedInLayout onCloseUserModal={onCloseUserModal} />}
      {!isLoggedIn && <AuthForm onCloseUserModal={onCloseUserModal} />}
    </Modal>
  );
};
export default UserModal;
