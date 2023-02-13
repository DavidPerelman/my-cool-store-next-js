import React from 'react';
import Button from '../Button/Button';
import classes from './Filtering.module.css';

const Filtering = ({
  filterText,
  handleChange,
  handleClear,
  filterInputRef,
}) => {
  return (
    <div className={classes.Filtering}>
      <div>
        <input
          ref={filterInputRef}
          type='text'
          placeholder='Search'
          onChange={(e) => handleChange(e)}
        />
        <button className={classes.button} onClick={handleClear}>
          X
        </button>
      </div>
    </div>
  );
};

export default Filtering;
