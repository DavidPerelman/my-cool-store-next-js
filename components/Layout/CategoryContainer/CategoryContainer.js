import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';
import classes from './CategoryContainer.module.css';

const CategoryContainer = ({ category }) => {
  console.log(category);
  let content;

  if (!category) {
    content = <LoadingSpinner key={'1'} />;
  }

  return (
    <div className={classes.CategoryContainer} key={category.name}>
      <div className={classes['categories-button']}>
        {/* <Button onClick={onCategoryClick}> */}
        Our {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        {/* </Button> */}
      </div>
      <div className={classes.products}>
        {/* <Row className={classes.Row}>{content}</Row> */}
        {content}
      </div>
    </div>
  );
};
export default CategoryContainer;
