import React, { createContext, useEffect, useState } from 'react';

const orderCtx = createContext({
  editable: false,
  copyOrderProducts: [],
  totalAmount: 0,
  makeOrderCopy: (id) => {},
  addOrderItemAmount: (id) => {},
  removeOrderItemAmount: (id) => {},
});

export const OrderContextProvider = (props) => {
  const [totalOrderCost, setTotalOrderCost] = useState(0);
  const [copyOrderProducts, setCopyOrderProducts] = useState([]);

  const makeOrderCopy = async (order) => {
    setCopyOrderProducts(order);
  };

  const calculateTotalCost = () => {
    let itemsPrice = 0;
    for (let i = 0; i < copyOrderProducts.length; i++) {
      itemsPrice +=
        copyOrderProducts[i].product.price *
        copyOrderProducts[i].productQuantity;
    }

    setTotalOrderCost(itemsPrice);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [totalOrderCost, copyOrderProducts]);

  const addOrderItemAmount = (item) => {
    const existingOrderItemIndex = copyOrderProducts.findIndex((cartItem) => {
      return item.product._id === cartItem.product._id;
    });

    let updatedItems;

    const existingOrderItem = copyOrderProducts[existingOrderItemIndex];
    if (existingOrderItem.productQuantity === 99) {
      return;
    } else {
      if (existingOrderItem) {
        const updatedItem = {
          ...existingOrderItem,
          productQuantity: existingOrderItem.productQuantity + 1,
        };

        updatedItems = [...copyOrderProducts];
        updatedItems[existingOrderItemIndex] = updatedItem;
      }
      setCopyOrderProducts(updatedItems);
    }
  };

  const removeOrderItemAmount = (item) => {
    const existingOrderItemIndex = copyOrderProducts.findIndex((cartItem) => {
      return item.product._id === cartItem.product._id;
    });

    const existingItem = copyOrderProducts[existingOrderItemIndex];

    let updatedItems;

    if (existingItem.productQuantity === 1) {
      updatedItems = copyOrderProducts.filter((orderItem) => {
        return item.product._id !== orderItem.product._id;
      });
    } else {
      const updatedItem = {
        ...existingItem,
        productQuantity: (existingItem.productQuantity -= 1),
      };
      updatedItems = [...copyOrderProducts];
      updatedItems[existingOrderItemIndex] = updatedItem;
    }

    setCopyOrderProducts(updatedItems);
  };

  // const makeAnOrderClick = (currentUser, cartItems) => {
  //   createOrder(currentUser.uid, cartItems);
  // };

  const contextValue = {
    copyOrderProducts: copyOrderProducts,
    totalAmount: totalOrderCost,
    makeOrderCopy: makeOrderCopy,
    addOrderItemAmount: addOrderItemAmount,
    removeOrderItemAmount: removeOrderItemAmount,
  };

  return (
    <orderCtx.Provider value={contextValue}>{props.children}</orderCtx.Provider>
  );
};

export default orderCtx;
