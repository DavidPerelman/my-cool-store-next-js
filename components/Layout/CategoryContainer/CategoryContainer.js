import { useEffect, useState } from 'react';
import Button from '@/components/UI/Button/Button';
import classes from './CategoryContainer.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

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
      const url = 'api/products';
      const response = await axios.get(url);
      if (response && response.ok) {
        setProducts(response.data.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);

  //   if (products && products.length > 0) {
  //     content = products.map((product, i) => {
  //       return (
  //         <Col sm={6} md={4} lg={3} key={i}>
  //           <ProductCard product={product} />
  //         </Col>
  //       );
  //     });
  //   }

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
      <div className={classes.products}>
        <Row className={classes.Row}>{content}</Row>
      </div>
    </div>
  );
};
export default CategoryContainer;
