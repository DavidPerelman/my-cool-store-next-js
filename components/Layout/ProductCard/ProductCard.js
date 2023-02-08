import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
// import Rating from '../../UI/Rating/Rating';
import classes from './ProductCard.module.css';
// import CartContext from '../../../store/cart-context';
import Icon from '../../UI/Icon/Icon';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  // const cartCtx = useContext(CartContext);

  const price = `$${product.price.toFixed(2)}`;

  // const existingCartItemIndex = cartCtx.items.findIndex((cartItem) => {
  //   return product._id === cartItem.product._id;
  // });

  // const existingCartItem = cartCtx.items[existingCartItemIndex];
  // let existingCartItemId;

  // if (existingCartItem) {
  //   existingCartItemId = Object.values(existingCartItem)[0]._id;
  // }

  const addToCartHandler = () => {
    // cartCtx.addItem(product);
  };

  return (
    // <Card className={classes.card}>
    //   <Link href={`/product/${product._id}`}>
    //     <Image
    //       src={`${product.thumbnail}`}
    //       className='card-img-top'
    //       alt={product.title}
    //       loading='lazy'
    //       width={250}
    //       height={270}
    //     />
    //   </Link>
    //   <Card.Body className={classes['card-body']}>
    //     <Link href={`/product/${product._id}`}>
    //       <Card.Title className={classes['card-title']}>
    //         {product.title}
    //       </Card.Title>
    //     </Link>
    //     {/* <Rating rating={product.rating} /> */}
    //     <Card.Body className={classes['card-footer']}>
    //       <Card.Text>{price}</Card.Text>
    //       {/* {existingCartItemId !== product._id ? (
    //         <Icon
    //           color='black'
    //           type='fa-solid fa-cart-plus'
    //           onClick={(e) => addToCartHandler(e)}
    //           size='lg'
    //         />
    //       ) : (
    //         <span className={classes['in-cart']}>In Cart</span>
    //       )} */}
    //     </Card.Body>
    //   </Card.Body>
    // </Card>

    <div className={classes.myCard}>
      <Image
        src={`${product.thumbnail}`}
        className='card-img'
        alt={product.title}
        loading='lazy'
        width={280}
        height={280}
      />
      <h1>{product.title}</h1>
    </div>
  );
};

export default ProductCard;
