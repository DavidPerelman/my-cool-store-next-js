import OrderContext from '@/context/order-context';
import React, { useContext } from 'react';
import classes from './OrderSummary.module.css';

const OrderSummary = ({
  editable,
  isOpen,
  status,
  onEditClick,
  onCancelEditClick,
  onUpdateOrderClick,
  totalPayment,
  onCheckoutOrderClick,
}) => {
  console.log(isOpen);
  const orderCtx = useContext(OrderContext);

  const total = `$${
    editable
      ? orderCtx.totalAmount.toFixed(2)
      : totalPayment && totalPayment.toFixed(2)
  }`;

  let editButton;

  if (isOpen) {
    if (!editable) {
      editButton = (
        <button className={classes['button--alt']} onClick={onEditClick}>
          Edit
        </button>
      );
    } else {
      editButton = (
        <button className={classes['button--alt']} onClick={onCancelEditClick}>
          Cancel
        </button>
      );
    }
  } else {
    editButton = '';
  }

  let checkoutButton;

  if (isOpen) {
    if (!editable) {
      checkoutButton = (
        <button className={classes.button} onClick={onCheckoutOrderClick}>
          Checkout
        </button>
      );
    } else {
      checkoutButton = (
        <button className={classes.button} onClick={onUpdateOrderClick}>
          Save
        </button>
      );
    }
  } else {
    checkoutButton = '';
  }

  return (
    <div className={classes.OrderSummary}>
      <div className={classes.orderStatus}>
        <div className={classes.total}>
          <span>Status:&nbsp;</span>
          <span>{status}</span>
        </div>
        <div className={classes.total}>
          <span>Total:&nbsp;</span>
          <span>{total}</span>
        </div>
      </div>
      <div className={classes.actions}>
        {editButton}
        {checkoutButton}
      </div>
    </div>
  );
};

export default OrderSummary;
