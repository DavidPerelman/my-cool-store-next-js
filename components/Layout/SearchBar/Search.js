import React, { useState } from 'react';
import classes from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { loadCategories } from '@/lib/load-categories';
import { loadProducts } from '@/lib/load-producs';

const Search = ({ id, placeholder, data }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState('');

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
        console.log(results);
        setResults(results);
      })
    );

    // const productsRes = await fetch(`/api/products`);
    // const productsData = await productsRes.json();
    // const categoriesRes = await fetch(`/api/categories`);
    // const categoriesData = await categoriesRes.json();
  };

  const handleChange = (value) => {
    fetchData(value);
    setInput(value);
  };

  return (
    // <div className={classes['Search']}>
    //   <div className={classes['input-wrapper']}>
    //     <BsSearch />
    //     <input
    //       className={classes['search-input']}
    //       type='text'
    //       placeholder={placeholder}
    //       value={input}
    //       onChange={(e) => handleChange(e.target.value)}
    //     />
    //   </div>
    //   <div className={classes['results-list']}>
    //     <div>A</div>
    //     <div>B</div>
    //     <div>C</div>
    //   </div>
    // </div>
    <div className={classes['search']}>
      <div className={classes['searchInputs']}>
        <input
          placeholder={placeholder}
          className={classes['input']}
          type='text'
          onChange={(e) => handleChange(e.target.value)}
          //   onBlur={(e) => {
          //     console.log((e.target.value = ''));
          //   }}
        />
        <BsSearch />
      </div>
      <div className={classes['dataResults']}>
        {data?.map((value, i) => {
          return (
            <Link
              key={i}
              href={
                id === 'products'
                  ? `/products/${value._id}`
                  : `/products/category/${value._id}`
              }
              //   className={classes.dataItem}
            >
              <p>{id === 'categories' ? value.name : value.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
