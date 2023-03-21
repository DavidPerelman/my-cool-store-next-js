import { useContext, useRef } from 'react';
// import AuthContext from '../../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = ({ setIsEditProfile, onChangePassword }) => {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  // const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
    // fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAcSWdXQfnlGw3kIWkAdpXtQ3Gr6Oxo8Hk',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       idToken: authCtx.token,
    //       password: enteredNewPassword,
    //       returnSecureToken: true,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // ).then((res) => {
    //   setIsEditProfile(false);
    // });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input
          type='password'
          id='old-password'
          minLength='7'
          ref={oldPasswordInputRef}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='7'
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
