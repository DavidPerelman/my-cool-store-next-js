import { useEffect, useState } from 'react';
import Button from '@/components/UI/Button/Button';
import classes from './CategoryContainer.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';

const CategoryContainer = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let content;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(false);

    try {
      const categoryId = category._id;
      const url = `api/products/${categoryId}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  console.log(products);

  if (products && products.length > 0) {
    content = products.map((product, i) => {
      return (
        // <div key={i} className={classes.box}>
        <ProductCard key={i} product={product} />
        // </div>
        // <Col sm={6} md={4} lg={3} key={i}>
        //   <ProductCard product={product} />
        // </Col>
      );
    });
  }

  const onCategoryClick = () => {
    console.log(category);
  };

  return (
    <div className={classes.CategoryContainer} key={category.name}>
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
