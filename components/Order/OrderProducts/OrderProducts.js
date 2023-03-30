import OrderContext from '@/context/order-context';
import React, { useContext } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import classes from './OrderProducts.module.css';

const OrderProducts = ({ products, editable }) => {
  // console.log(products);
  const orderCtx = useContext(OrderContext);

  const productItemAddHandler = (product) => {
    orderCtx.addOrderItemAmount(product);
  };

  const productItemRemoveHandler = (product) => {
    orderCtx.removeOrderItemAmount(product);
  };

  const productsList =
    products &&
    products.map((product, i) => (
      <ProductItem
        key={i}
        product={product}
        editable={editable}
        amount={product.productQuantity}
        onAdd={productItemAddHandler.bind(null, product)}
        onRemove={productItemRemoveHandler.bind(null, product)}
      />
    ));

  return <ul className={classes.OrderProducts}>{productsList}</ul>;
};

export default OrderProducts;
