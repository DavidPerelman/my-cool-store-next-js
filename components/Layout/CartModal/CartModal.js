import React, { useContext } from 'react';
import CartContext from '@/context/cart-context';
import Modal from '@/components/UI/Modal/Modal';
import classes from './CartModal.module.css';
import CartItem from '../CartItem/CartItem';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/use-local-storage';

const CartModal = ({ onCloseCart }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
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

  const makeAnOrderClick = async (session, cartItems) => {
    const orderData = {
      userId: session.user._id,
      items: cartItems,
      totalAmount: cartCtx.totalAmount,
    };

    try {
      const response = await fetch(`/api/orders/create-order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Cookie: session,
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();

      if (data.success) {
        cartCtx.resetCart();
        onCloseCart();
        router.push(`/users/orders/${data.order.insertedId}`);
      }
    } catch (error) {
      console.error(error);
    }
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
      {!session && <p>You must be logged in to place an order!</p>}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onCloseCart}>
          Close
        </button>
        {hasItems && session && (
          <button
            className={classes.button}
            onClick={() =>
              makeAnOrderClick(session, cartCtx.items, totalAmount)
            }
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default CartModal;
