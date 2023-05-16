import React, { useRef, useState } from 'react';
import classes from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';
import SearchResultsList from './SearchResultsList';
import { useRouter } from 'next/router';
import { useOutsideClicker } from '@/hooks/useOutsideClicker';

const SearchBar = ({ id, placeholder, showLinks, setShowLinks }) => {
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const wrapperRef = useRef(null);
  const router = useRouter();
  useOutsideClicker(wrapperRef, results, setResults);

  const fetchData = async (value) => {
    fetch(`/api/${id}`).then((response) =>
      response.json().then((json) => {
        const results = json.filter((val) => {
          return id === 'categories'
            ? value &&
                val &&
                val.name &&
                val.name.toLowerCase().includes(value.toLowerCase())
            : value &&
                val &&
                val.title &&
                val.title.toLowerCase().includes(value.toLowerCase());
        });
        setResults(results);
      })
    );
  };

  const handleChange = () => {
    if (inputRef.current.value === '') {
      setResults([]);
    } else {
      fetchData(inputRef.current.value);
    }
  };

  const clickHandler = (_id) => {
    inputRef.current.value = '';
    setResults([]);
    setShowLinks(!showLinks);

    id === 'products'
      ? router.push(`/products/${_id}`)
      : router.push(`/products/category/${_id}`);
  };

  return (
    <div ref={wrapperRef}>
      <div className={classes['searchInputs']}>
        <div className={classes['search-icon']}>
          <BsSearch />
        </div>
        <input
          placeholder={placeholder}
          className={classes['input']}
          type='text'
          ref={inputRef}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <SearchResultsList
        id={id}
        onClickHandler={clickHandler}
        results={results}
        setResults={setResults}
        inputRef={inputRef}
      />
    </div>
  );
};

export default SearchBar;
