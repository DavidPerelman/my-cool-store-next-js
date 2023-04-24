import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import classes from './CategoryProductsPage.module.css';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';
import ProductCard from '@/components/Layout/ProductCard/ProductCard';
import { loadCategories, loadProductsByCategory } from '@/lib/load-categories';

export default function CategoryProductsPage({ data }) {
  const { category, products } = data;
  const [isLoading, setIsLoading] = useState(false);

  const categoryName =
    category[0].name.charAt(0).toUpperCase() + category[0].name.slice(1);

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
        <h1>{categoryName}</h1>
      </div>
      <div className={classes.products}>
        <Row className={classes.Row}>{content}</Row>
      </div>
    </div>
  );
}

// CategoryProductsPage.getInitialProps = async (ctx) => {
//   const categoryId = ctx.query.categoryId;

//   const productsResponse = await fetch(
//     `${process.env.DB_HOST}/api/categories/${categoryId}`
//   );

//   const data = await productsResponse.json();

//   return { data: data };
// };

export async function getStaticPaths() {
  const categories = await loadCategories();

  const paths = categories.map((category) => {
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

  const data = await loadProductsByCategory(categoryId);

  return {
    props: {
      data: data,
    },
  };
}
