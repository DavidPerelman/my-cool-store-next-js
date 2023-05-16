import React, { useState } from 'react';
import classes from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import SearchResultsList from './SearchResultsList';

const Search = ({ id, placeholder }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    fetch(`/api/${id}`).then((response) =>
      response.json().then((json) => {
        const results = json.filter((val) => {
          return id === 'categories'
            ? value && val && val.name && val.name.toLowerCase().includes(value)
            : value &&
                val &&
                val.title &&
                val.title.toLowerCase().includes(value);
        });
        setResults(results);
      })
    );
  };

  const handleChange = (value) => {
    console.log(input);
    if (value === '') {
      setResults([]);
    } else {
      fetchData(value);
      setInput(value);
    }
  };

  return (
    <div>
      <div className={classes['searchInputs']}>
        <div className={classes['search-icon']}>
          <BsSearch />
        </div>
        <input
          placeholder={placeholder}
          className={classes['input']}
          type='text'
          onChange={(e) => handleChange(e.target.value)}
          value={input}
        />
      </div>
      <SearchResultsList
        id={id}
        results={results}
        setResults={setResults}
        setInput={setInput}
      />
    </div>
  );
};

export default Search;
