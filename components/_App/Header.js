import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import classes from './Header.module.css';

const Header = ({ children }) => {
  return (
    <div>
      {/* <header className={classes.Header}> */}
      <Navbar className={classes.Header}>
        <Container>
          {/* <LinkContainer to='/'> */}
          <Navbar.Brand className={classes['site-title']}>
            MyCoolStore
          </Navbar.Brand>
          {/* </LinkContainer> */}
        </Container>
      </Navbar>
      {/* </header> */}
    </div>
  );
};

export default Header;
