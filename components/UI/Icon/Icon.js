import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './Icon.module.css';

const Icon = ({ type, count, amount, onClick, isLoggedIn, size, color }) => {
  return (
    <div className={classes.cart} onClick={onClick}>
      {count && <span className={classes.count}>{amount}</span>}
      <FontAwesomeIcon
        size='xl'
        icon={type === 'user' ? faUser : ''}
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
