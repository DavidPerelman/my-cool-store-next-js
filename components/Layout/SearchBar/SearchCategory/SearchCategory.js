import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './SearchCategory.module.css';
import axios from 'axios';

const SearchCategory = ({ placeholder, data }) => {
  const [show, setShow] = useState(false);
  const [filteredData, setfilteredData] = useState(data);

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (e.target.id === 'SearchCategoryInput') {
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

  const dataItemClick = (id) => {
    // navigate(`/products/${id}`);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchInputs}>
        <input
          type='text'
          placeholder={placeholder}
          id='SearchCategoryInput'
          onChange={handleFilter}
        />
      </div>
      {show && (
        <div className={classes.dataResults}>
          {filteredData.map((value, key) => (
            <div
              className={classes.dataItem}
              key={key}
              onClick={() => dataItemClick(value._id)}
            >
              <Link href={`/products/${value._id}`}>
                {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCategory;
