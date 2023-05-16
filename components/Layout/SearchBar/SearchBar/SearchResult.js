import React from 'react';
import classes from './Search.module.css';
import { useRouter } from 'next/router';

const SearchResult = ({ id, result, setResults, setInput }) => {
  const router = useRouter();

  const clickHandler = (_id) => {
    setInput('');
    setResults([]);

    id === 'products'
      ? router.push(`/products/${_id}`)
      : router.push(`/products/category/${_id}`);
  };

  return (
    <div
      className={classes['search-result']}
      onClick={(e) => clickHandler(result._id)}
    >
      {id === 'categories' ? result.name : result.title}
    </div>
  );
};

export default SearchResult;
