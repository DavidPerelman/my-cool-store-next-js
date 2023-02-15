import { useState, useEffect } from 'react';
import { getCategories, getCategory } from '@/lib/mongo/categories';
import { Col, Row } from 'react-bootstrap';
import classes from './CategoryProductsPage.module.css';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';
import ProductCard from '@/components/Layout/ProductCard/ProductCard';
import { getProductsByCategory } from '@/lib/mongo/products';

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.categories.map((category) => {
    return {
      params: { categoryId: category._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const categoryId = context.params.categoryId;
  const category = await getCategory(categoryId);
  const products = await getProductsByCategory(categoryId);

  return {
    props: {
      category: category.category,
      products: products.products.map((product) => ({
        _id: product._id.toString(),
        title: product.title,
        price: product.price,
        description: product.description,
        brand: product.brand,
        category: product.category.toString(),
        thumbnail: product.thumbnail,
      })),
    },
  };
}

export default function CategoryProductsPage({ category, products }) {
  const [categoryObj, setCategoryObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCategoryObj(JSON.parse(category));
  }, [category]);

  let content;

  if (products && products.length > 0) {
    content = products.map((product, i) => {
      return (
        <Col sm={6} md={4} lg={3} key={i} className={classes['product-card']}>
          <ProductCard product={product} />
        </Col>
      );
    });
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  return (
    <div className={classes.CategoryContainer}>
      <div className={classes['categories-button']}>
        <h1>{categoryObj.name}</h1>
      </div>
      <div className={classes.products}>
        <Row className={classes.Row}>{content}</Row>
      </div>
    </div>
  );
}
