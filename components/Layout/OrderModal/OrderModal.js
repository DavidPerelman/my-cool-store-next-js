import Modal from '@/components/UI/Modal/Modal';
import React from 'react';
import classes from './OrderModal.module.css';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

const OrderModal = ({ onCloseCart }) => {
  return (
    <Modal onClose={onCloseCart}>
      <h1 className={classes.header}>Loading</h1>
      <div className={classes.spinner}>
        <LoadingSpinner />
      </div>
    </Modal>
  );
};

export default OrderModal;
