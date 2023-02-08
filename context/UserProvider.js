import React, { useReducer } from 'react';
import UserContext from './user-context';

const defaultUserState = {
  isUserModalShown: false,
  user: {},
  isLoggedIn: false,
};

const userReducer = (state, action) => {
  if (action.type === 'SHOW_USER_MODAL') {
    return {
      isUserModalShown: true,
      user: state.user,
      isLoggedIn: state.isLoggedIn,
    };
  }
  if (action.type === 'HIDE_USER_MODAL') {
    return {
      isUserModalShown: false,
      user: state.user,
      isLoggedIn: state.isLoggedIn,
    };
  }

  return defaultUserState;
};

const UserProvider = ({ children }) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  const showUserModalHandler = () => {
    dispatchUserAction({ type: 'SHOW_USER_MODAL' });
  };

  const hideUserModalHandler = () => {
    dispatchUserAction({ type: 'HIDE_USER_MODAL' });
  };

  const loginUserHandler = (userData) => {
    dispatchUserAction({ type: 'LOGIN', userData: userData });
  };

  const registerUserHandler = (newUserData) => {
    dispatchUserAction({ type: 'REGISTER', newUserData: newUserData });
  };

  const logoutHandler = (newUserData) => {
    dispatchUserAction({ type: 'REGISTER', newUserData: newUserData });
  };

  const userContext = {
    isUserModalShown: userState.isUserModalShown,
    showUserModal: showUserModalHandler,
    hideUserModal: hideUserModalHandler,
    user: userState.user,
    isLoggedIn: userState.isLoggedIn,
    login: loginUserHandler,
    register: registerUserHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
