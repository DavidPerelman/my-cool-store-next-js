import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCartShopping,
  faCartPlus,
  faFlag,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import classes from './Icon.module.css';

const Icon = ({ type, amount, onClick, isLoggedIn, size, color }) => {
  return (
    <div className={`${classes.Icon} ${classes[type]}`} onClick={onClick}>
      {type === 'cart-shopping' && (
        <span className={classes.count}>{amount}</span>
      )}
      <FontAwesomeIcon
        size={size}
        icon={
          type === 'user'
            ? faUser
            : type === 'cart-shopping'
            ? faCartShopping
            : type === 'cart-plus'
            ? faCartPlus
            : type === 'brand'
            ? faFlag
            : type === 'arrow-left'
            ? faArrowLeft
            : type === 'arrow-right'
            ? faArrowRight
            : ''
        }
        style={{ color: `${color}` }}
        className={`${type === 'user' && isLoggedIn ? classes.isLogin : ''}`}
      />
    </div>
  );
};

export default Icon;
