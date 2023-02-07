// import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import classes from './Icon.module.css';

const Icon = ({ type, count, amount, onClick, isLoggedIn, size, color }) => {
  console.log((amount = 0));
  return (
    <div className={classes.Icon} onClick={onClick}>
      {type === 'cart' && <span className={classes.count}>{amount}</span>}
      <FontAwesomeIcon
        size='2xl'
        icon={type === 'user' ? faUser : faCartShopping}
        style={{ color: `${color}` }}
      />

      {/* <i
        style={{ color: `${color}` }}
        className={`fas ${type} fa-${size || 'lg'} ${classes.headerIcon} ${
          type === 'fa-user' && isLoggedIn ? classes.isLogin : ''
        }`}
      ></i> */}
    </div>
  );
};

export default Icon;
