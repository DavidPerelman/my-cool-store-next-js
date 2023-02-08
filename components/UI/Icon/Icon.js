import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCartShopping,
  faCartPlus,
  faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import classes from './Icon.module.css';

const Icon = ({ type, amount, onClick, isLoggedIn, size, color }) => {
  return (
    <div className={classes.Icon} onClick={onClick}>
      {type === 'cart' && <span className={classes.count}>{amount}</span>}
      <FontAwesomeIcon
        size={size}
        icon={
          type === 'user'
            ? faUser
            : type === 'cart-shopping'
            ? faCartShopping
            : type === 'cart-plus'
            ? faCartPlus
            : ''
        }
        style={{ color: `${color}` }}
        className={`${type === 'user' && isLoggedIn ? classes.isLogin : ''}`}
      />
    </div>
  );
};

export default Icon;
