import React from 'react';
import classes from './ProductItem.module.css';

const ProductItem = ({ product, amount, editable, onAdd, onRemove }) => {
  const price = `$${product.price.toFixed(2)}`;

  return (
    <li key={product._id} className={classes.product}>
      <div className={classes['order-product-details']}>
        <div className={classes.image}>
          <img
            className={classes['order-image']}
            src={product.thumbnail}
            alt={product.title}
            loading='lazy'
          />
        </div>
        <div className={classes.content}>
          <h3>{product.title}</h3>
          <div className={classes.description}>{product.description}</div>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={classes.amount}>x {amount}</span>
          </div>
        </div>
      </div>
      {editable && (
        <div className={classes.actions}>
          <button onClick={onRemove}>−</button>
          <button onClick={onAdd}>+</button>
        </div>
      )}
    </li>
  );
};

export default ProductItem;
