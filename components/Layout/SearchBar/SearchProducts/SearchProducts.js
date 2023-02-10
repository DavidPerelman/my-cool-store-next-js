import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './SearchProducts.module.css';

const SearchProducts = ({ placeholder, data }) => {
  const [show, setShow] = useState(false);
  const [filteredData, setfilteredData] = useState(data);

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (e.target.id === 'SearchProductsInput') {
        // Clicked in input
        setShow(true);
      } else {
        // Clicked outside the input
        setShow(false);
      }
    });
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setfilteredData(newFilter);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchInputs}>
        <input
          type='text'
          placeholder={placeholder}
          id='SearchProductsInput'
          onChange={handleFilter}
        />
      </div>
      {show && (
        <div className={classes.dataResults}>
          {filteredData.map((value, key) => (
            <Link
              key={key}
              className={classes.dataItem}
              href={`/products/${value._id}`}
            >
              {value.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
