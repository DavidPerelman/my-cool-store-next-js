import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import classes from './Icon.module.css';

const Icon = ({ type, amount, onClick, isLoggedIn, size, color }) => {
  console.log(isLoggedIn);
  return (
    <div className={classes.Icon} onClick={onClick}>
      {type === 'cart' && <span className={classes.count}>{amount}</span>}
      <FontAwesomeIcon
        size={size}
        icon={type === 'user' ? faUser : faCartShopping}
        style={{ color: `${color}` }}
        className={`${type === 'user' && isLoggedIn ? classes.isLogin : ''}`}
      />
    </div>
  );
};

export default Icon;
