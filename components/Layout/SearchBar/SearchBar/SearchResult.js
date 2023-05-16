import React from 'react';
import classes from './SearchBar.module.css';

const SearchResult = ({ id, result, onClickHandler }) => {
  return (
    <div
      className={classes['search-result']}
      onClick={(e) => onClickHandler(result._id)}
    >
      {id === 'categories' ? result.name : result.title}
    </div>
  );
};

export default SearchResult;
