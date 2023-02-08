import { useEffect, useState } from 'react';
import Button from '@/components/UI/Button/Button';
import classes from './CategoryContainer.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';

const CategoryContainer = ({ category, products }) => {
  //   const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = products.filter(
    (product) => product.category === category._id
  );
  let content;

  if (filteredProducts) {
    content = filteredProducts.slice(0, 4).map(
      (product, i) => {
        //   if (product.category === category._id) {
        return (
          <ProductCard key={i} product={product} />
          //    <Col sm={6} md={4} lg={3} key={i}>
          //      <ProductCard product={product} />
          //    </Col>
        );
      }
      // }
    );
  }

  const onCategoryClick = () => {
    console.log(category);
  };

  return (
    <div key={category.name}>
      <div className={classes['categories-button']}>
        <Button onClick={onCategoryClick}>
          Our {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </Button>
      </div>
      {/* <div className={classes.products}>
        <Row className={classes.Row}>{content}</Row>
      </div> */}
      <div className={classes.container}>{content}</div>
    </div>
  );
};
export default CategoryContainer;
