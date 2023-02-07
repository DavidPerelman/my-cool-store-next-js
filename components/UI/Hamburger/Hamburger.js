import React from 'react';
import classes from './Hamburger.module.css';

const Hamburger = ({ showLinks, setShowLinks }) => {
  return (
    <div
      className={`${classes.toggle} ${showLinks ? classes['x-hamburger'] : ''}`}
      onClick={() => setShowLinks(!showLinks)}
    >
      <span className={`${classes['top_line']} ${classes.common}`}></span>
      <span className={`${classes['middle_line']} ${classes.common}`}></span>
      <span className={`${classes['bottom_line']} ${classes.common}`}></span>
    </div>
  );
};

export default Hamburger;
