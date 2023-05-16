import React, { useState } from 'react';
import classes from './Search.module.css';
import { BsSearch } from 'react-icons/bs';

const Search = ({ id, placeholder, data }) => {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    if (id === 'categories') {
      const results = data.filter((val) => {
        return (
          value && val && val.name && val.name.toLowerCase().includes(value)
        );
      });
      console.log(results);
    } else {
      const results = data.filter((val) => {
        return (
          value && val && val.title && val.title.toLowerCase().includes(value)
        );
      });
      console.log(results);
    }

    setInput(value);
  };

  return (
    <div className={classes['input-wrapper']}>
      <BsSearch />
      <input
        className={classes['search-input']}
        type='text'
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
