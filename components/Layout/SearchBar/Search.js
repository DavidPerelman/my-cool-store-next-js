import React from 'react';
import classes from './Search.module.css';

const Search = () => {
  return (
    <div className={classes['input-wrapper']}>
      <input type='text' placeholder='Search' />
    </div>
  );
};

export default Search;
