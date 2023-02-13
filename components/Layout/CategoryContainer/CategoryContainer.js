import Button from '@/components/UI/Button/Button';
import classes from './CategoryContainer.module.css';
import ProductCard from '../ProductCard/ProductCard';
import Link from 'next/link';

const CategoryContainer = ({ category, products }) => {
  products.filter((product) => product.category === category._id);

  const filteredProducts = products.filter(
    (product) => product.category === category._id
  );
  let content;

  if (filteredProducts) {
    content = filteredProducts.slice(0, 4).map((product, i) => {
      return <ProductCard key={i} product={product} />;
    });
  }

  const onCategoryClick = () => {
    console.log(category);
  };

  return (
    <div key={category.name}>
      <div className={classes['categories-button']}>
        <Button onClick={onCategoryClick}>
          <Link href={`/products/category/${category._id}`} legacyBehavior>
            <a className={classes['category-link']}>
              Our{' '}
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}{' '}
            </a>
          </Link>
        </Button>
      </div>
      <div className={classes.container}>{content}</div>
    </div>
  );
};
export default CategoryContainer;
