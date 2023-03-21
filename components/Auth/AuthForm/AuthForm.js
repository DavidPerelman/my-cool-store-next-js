import { useContext, useRef, useState } from 'react';
import classes from './AuthForm.module.css';
// import LoggedInLayout from '../../Layout/LoggedInLayout/LoggedInLayout';
import AuthContext from '@/context/auth-context';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const AuthForm = ({ onCloseUserModal }) => {
  // const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const isLoggedIn = authCtx.authorized;
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredUserName = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!regex.test(enteredEmail)) {
        setError('The email address is not valid!');
        clearError();
        return;
      }

      if (enteredUserName === '') {
        setError('User name is required!');
        clearError();
        return;
      }
      if (enteredPassword.length < 7) {
        setError('The password must contain at least 6 characters!');
        clearError();
        return;
      }
    }

    setIsLoading(true);

    if (isLogin) {
      try {
        const data = await signIn('credentials', {
          redirect: false,
          enteredEmail,
          enteredPassword,
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
      // await authCtx.login(enteredEmail, enteredPassword);
      // setIsLoading(false);

      // if (authCtx.authorized !== null) {
      // }
    } else {
      try {
        const data = await axios.post('/api/register', {
          userName: enteredUserName,
          email: enteredEmail,
          password: enteredPassword,
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
    onCloseUserModal();
  };

  return (
    <section className={!isLoggedIn ? classes.auth : classes.authLoggedIn}>
      {!isLoggedIn && (
        <>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
            <div
              className={`${classes.control} ${isLogin ? classes.hidden : ''}`}
            >
              <label htmlFor='username'>User Name</label>
              <input type='text' id='username' ref={usernameInputRef} />
            </div>

            <div className={classes.control}>
              <label htmlFor='email'>Your Email</label>
              <input type='email' id='email' required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Your Password</label>
              <input
                type='password'
                id='password'
                required
                ref={passwordInputRef}
              />
            </div>
            {authCtx.error && <p className={classes.error}>{authCtx.error}</p>}
            {/* {error && <p className={classes.error}>{error}</p>} */}
            <div className={classes.actions}>
              {!isLoading && !authCtx.error && (
                <button>{isLogin ? 'Login' : 'Create Account'}</button>
              )}
              {isLoading && <p>Sending request...</p>}
              <button
                type='button'
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
            </div>
          </form>
        </>
      )}
      {/* {isLoggedIn && <LoggedInLayout onCloseUserModal={onCloseUserModal} />} */}
    </section>
  );
};

export default AuthForm;
