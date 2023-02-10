import Button from '@/components/UI/Button/Button';
import classes from './CategoryContainer.module.css';
import ProductCard from '../ProductCard/ProductCard';

const CategoryContainer = ({ category, products }) => {
  console.log(products.filter((product) => product.category === category._id));

  const filteredProducts = products.filter(
    (product) => product.category === category._id
  );
  let content;
  console.log(filteredProducts);

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
          Our {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </Button>
      </div>
      <div className={classes.container}>{content}</div>
    </div>
  );
};
export default CategoryContainer;
