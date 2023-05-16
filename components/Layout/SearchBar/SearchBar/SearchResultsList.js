import React from 'react';
import classes from './Search.module.css';
import SearchResult from './SearchResult';

const SearchResultsList = ({ id, results, setResults, setInput }) => {
  return (
    <div className={classes['results-list']}>
      {results &&
        results.map((result, i) => {
          return (
            <SearchResult
              key={i}
              result={result}
              setResults={setResults}
              setInput={setInput}
              id={id}
            />
          );
        })}
    </div>
  );
};

export default SearchResultsList;
