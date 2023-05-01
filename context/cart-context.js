import React, { createContext, useCallback, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';

const cartCtx = createContext({
  cartIsShown: false,
  showCart: () => {},
  hideCart: () => {},
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  addCartItemAmount: (id) => {},
  removeCartItemAmount: (id) => {},
  makeAnOrderClick: (userId) => {},
  resetCart: () => {},
});

export const CartContextProvider = (props) => {
  const [totalCartCost, setTotalCartCost] = useState(0);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [existingCartItemId, setExistingCartItemId] = useState();

  const calculateTotalCost = useCallback(() => {
    const itemsPrice = cartItems.reduce(
      (previousValue, cartItem) =>
        previousValue + cartItem.product.price * cartItem.amount,
      0
    );

    setTotalCartCost(itemsPrice);
  }, [cartItems]);

  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost]);

  const onShowCart = () => {
    setCartIsShown(true);
  };

  const onHideCart = () => {
    setCartIsShown(false);
  };

  const addCartItem = (product) => {
    setCartItems((prevCartItems) => {
      if (
        prevCartItems.find((cartItem) => cartItem.product._id === product._id)
      ) {
        alert('The product is already in the cart');
        return prevCartItems;
      }
      return [...prevCartItems, { product: product, amount: 1 }];
    });
  };

  const addCartItemAmount = (item) => {
    const existingCartItemIndex = cartItems.findIndex((cartItem) => {
      return item.product._id === cartItem.product._id;
    });

    let updatedItems;

    const existingCartItem = cartItems[existingCartItemIndex];
    if (existingCartItem.amount === 99) {
      return;
    } else {
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: (existingCartItem.amount += 1),
        };

        updatedItems = [...cartItems];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      setCartItems(updatedItems);
    }
  };

  const removeCartItemAmount = (item) => {
    const existingCartItemIndex = cartItems.findIndex((cartItem) => {
      return item.product._id === cartItem.product._id;
    });

    const existingItem = cartItems[existingCartItemIndex];

    const updatedTotalAmount = totalCartCost - existingItem.product.price;
    setTotalCartCost(updatedTotalAmount);

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = cartItems.filter((cartItem) => {
        return item.product._id !== cartItem.product._id;
      });
    } else {
      const updatedItem = {
        ...existingItem,
        amount: (existingItem.amount -= 1),
      };
      updatedItems = [...cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    setExistingCartItemId(existingItem.product._id);
    setCartItems(updatedItems);
  };

  const resetCart = () => {
    setCartItems([]);
  };

  const makeAnOrderClick = async (session, cartItems, totalAmount) => {
    const orderData = {
      userId: session.user._id,
      items: cartItems,
      totalAmount: totalAmount,
    };

    try {
      const response = await fetch(
        `${process.env.DB_HOST}/api/orders/create-order`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            Cookie: context.req.headers.cookie,
          },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();

      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
    resetCart: resetCart,
    cartIsShown: cartIsShown,
    showCart: onShowCart,
    hideCart: onHideCart,
    items: cartItems,
    totalAmount: totalCartCost,
    addItem: addCartItem,
    addCartItemAmount: addCartItemAmount,
    removeCartItemAmount: removeCartItemAmount,
    makeAnOrderClick: makeAnOrderClick,
    existingCartItemId: existingCartItemId,
  };

  return (
    <cartCtx.Provider value={contextValue}>{props.children}</cartCtx.Provider>
  );
};

export default cartCtx;
