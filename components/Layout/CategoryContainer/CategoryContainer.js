import Button from '@/components/UI/Button/Button';
import classes from './CategoryContainer.module.css';

const CategoryContainer = ({ category }) => {
  console.log('isLoading');
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
        {/* <Row className={classes.Row}>{content}</Row> */}
      </div>
    </div>
  );
};
export default CategoryContainer;
