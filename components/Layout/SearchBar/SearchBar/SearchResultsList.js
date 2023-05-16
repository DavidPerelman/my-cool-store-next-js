import React from 'react';
import classes from './SearchBar.module.css';
import SearchResult from './SearchResult';

const SearchResultsList = ({ id, results, onClickHandler }) => {
  return (
    <div className={classes['results-list']}>
      {results &&
        results.map((result, i) => {
          return (
            <SearchResult
              key={i}
              result={result}
              onClickHandler={onClickHandler}
              id={id}
            />
          );
        })}
    </div>
  );
};

export default SearchResultsList;
