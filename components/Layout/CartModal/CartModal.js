import React, { useContext } from 'react';
import CartContext from '@/context/cart-context';
import Modal from '@/components/UI/Modal/Modal';
import classes from './CartModal.module.css';

const CartModal = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext);

  return (
    <Modal onClose={onCloseCart}>
      {/* {!authCtx.authorized && <p>You must be logged in to place an order!</p>} */}
      {/* {cartItems} */}
      <div className={classes.total}>
        <span>Total Amount</span>
        {/* <span>{totalAmount}</span> */}
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onCloseCart}>
          Close
        </button>
        {/* {hasItems && authCtx.authorized && (
          <button
            className={classes.button}
            onClick={() => cartCtx.makeAnOrderClick(authCtx, cartCtx.items)}
          >
            Order
          </button>
        )} */}
      </div>
    </Modal>
  );
};
export default CartModal;
