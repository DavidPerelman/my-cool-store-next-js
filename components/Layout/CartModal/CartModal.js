import React, { useContext } from 'react';
import CartContext from '@/context/cart-context';
import Modal from '@/components/UI/Modal/Modal';
import classes from './CartModal.module.css';
import CartItem from '../CartItem/CartItem';

const CartModal = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext);

  if (cartCtx.totalAmount < 0) {
    cartCtx.totalAmount = 0;
  }

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addCartItemAmount(item);
  };

  const cartItemRemoveHandler = (item) => {
    cartCtx.removeCartItemAmount(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item, i) => {
        return (
          <CartItem
            key={i}
            item={item}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={onCloseCart}>
      {/* {!authCtx.authorized && <p>You must be logged in to place an order!</p>} */}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
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
