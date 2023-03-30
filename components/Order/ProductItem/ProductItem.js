import Image from 'next/image';
import React from 'react';
import classes from './ProductItem.module.css';

const ProductItem = ({ product, amount, editable, onAdd, onRemove }) => {
  console.log(product);
  const price = `$${product.product.price.toFixed(2)}`;

  return (
    <li key={product.product._id} className={classes.product}>
      <div className={classes['order-product-details']}>
        <div className={classes.image}>
          <Image
            src={`${product.product.thumbnail}`}
            alt={product.product.title}
            loading='lazy'
            width={280}
            height={270}
          />
        </div>
        <div className={classes.content}>
          <h3>{product.product.title}</h3>
          <div className={classes.description}>
            {product.product.description}
          </div>
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
