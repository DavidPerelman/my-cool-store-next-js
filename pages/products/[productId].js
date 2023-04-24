import Carousel from '@/components/UI/Carousel/Carousel';
import Icon from '@/components/UI/Icon/Icon';
import Rating from '@/components/UI/Rating/Rating';
import CartContext from '@/context/cart-context';
import { useState, useEffect, useContext } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import classes from './ProductDetailsPage.module.css';
export default function ProductDetail({ product }) {
  const [inCartHtml, setInCartHtml] = useState();
  const cartCtx = useContext(CartContext);

  const price = `$${product.price.toFixed(2)}`;
  const existingCartItemIndex = cartCtx.items.findIndex((cartItem) => {
    return product && product._id === cartItem.product._id;
  });

  const existingCartItem = cartCtx.items[existingCartItemIndex];
  let existingCartItemId;

  if (existingCartItem) {
    existingCartItemId = Object.values(existingCartItem)[0]._id;
  }

  useEffect(() => {
    setInCartHtml(existingCartItemId !== product._id);
  }, [existingCartItemId, product._id]);

  const addToCartHandler = () => {
    cartCtx.addItem(product);
  };

  const onCategoryClick = () => {
    navigate(`/products/${product.category._id}`);
  };

  let content;

  content = (
    <Card className={classes.card}>
      <Row className={classes.row}>
        <Col>
          <ListGroup variant='flush'>
            <ListGroup.Item
              className={`${classes['list-group-item']} ${classes['brand']}`}
            >
              <Icon
                type={'brand'}
                color='black'
                size='2xs'
                className={classes.brandIcon}
              />
              {product.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>{product.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item className={classes['list-group-item']}>
              <p className={classes['category-name']} onClick={onCategoryClick}>
                {product.category.name}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className={classes['list-group-item']}>
              <p>{product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} />
            </ListGroup.Item>
            <ListGroup.Item className={classes['price-list-group']}>
              Price : {price}{' '}
              <span className={classes['price-action']}>
                {inCartHtml ? (
                  <Icon
                    type={'cart-plus'}
                    onClick={(e) => addToCartHandler(e)}
                    size='lg'
                  />
                ) : (
                  <span className={classes['in-cart']}>In Cart</span>
                )}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Carousel images={product.images} />
        </Col>
      </Row>
    </Card>
  );

  return <div className={classes.ProductDetailsPage}>{content}</div>;
}

ProductDetail.getInitialProps = async (ctx) => {
  const productId = ctx.query.productId;

  const productResponse = await fetch(
    `${process.env.DB_HOST}/api/products/${productId}`
  );

  const product = await productResponse.json();

  return { product: product[0] };
};
