import React from 'react';
import classes from './ProductItemForm.module.css';

const ProductItemForm = () => {
  return (
    <form className={classes.form}>
      <input type='text' />
      <button>- Remove</button>
    </form>
  );
};

export default ProductItemForm;
