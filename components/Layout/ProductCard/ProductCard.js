import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import Icon from '../../UI/Icon/Icon';
import Link from 'next/link';
import Image from 'next/image';
import Rating from '@/components/UI/Rating/Rating';
import CartContext from '@/context/cart-context';

const ProductCard = ({ product }) => {
  const cartCtx = useContext(CartContext);
  const price = `$${product.price.toFixed(2)}`;

  const addToCartHandler = () => {
    cartCtx.addItem(product);
  };

  return (
    <Card className={classes.card}>
      <Link href={`/product/${product._id}`}>
        <Image
          src={`${product.thumbnail}`}
          className='card-img-top'
          alt={product.title}
          loading='lazy'
          width={280}
          height={270}
        />
      </Link>
      <Card.Body className={classes['card-body']}>
        <Link href={`/product/${product._id}`} legacyBehavior>
          <a className={classes['card-title']}>
            <Card.Title>{product.title}</Card.Title>
          </a>
        </Link>
        <Rating rating={5} />
        <Card.Body className={classes['card-footer']}>
          <Card.Text>{price}</Card.Text>
          {!cartCtx.checkExistingCartItem(product._id) ? (
            <Icon
              type={'cart-plus'}
              color='black'
              onClick={(e) => addToCartHandler(e)}
              size='2xl'
            />
          ) : (
            <span className={classes['in-cart']}>In Cart</span>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
