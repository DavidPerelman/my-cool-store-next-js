import Link from 'next/link';
import Icon from '../UI/Icon/Icon';
import classes from './Header.module.css';

const Header = ({ children }) => {
  return (
    <div className='d-flex flex-column site-container'>
      <div className={classes.MyNavbar}>
        <div className={classes['left-side']}>
          <Link className={classes['site-title']} href='/'>
            MyCoolStore
          </Link>
        </div>
        <div className={classes['right-side']}>
          <div
            className={classes.links}
            // id={showLinks ? classes['hidden'] : ''}
          ></div>
          <div className={classes.icons}>
            <Icon type={'user'} color='white' count={false} />
          </div>
          <div className={classes.Hamburger}>
            {/* <Hamburger showLinks={showLinks} setShowLinks={setShowLinks} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
