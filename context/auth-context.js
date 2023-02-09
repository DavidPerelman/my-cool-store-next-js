import React, { createContext, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';

import { auth } from '@/firebase';
import axios from 'axios';
// import { createToken, createUser } from '../api/usersApi';

const AuthContext = createContext({
  userModalIsShown: false,
  showUserModal: () => {},
  hideUserModal: () => {},
  token: '',
  isLoggedIn: false,
  authorized: false,
  currentUser: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  // checkUserIsAuthorized: () => {},
  clearError: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [userModalIsShown, setUserModalIsShown] = useState(false);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);

  const onShowUserModal = () => {
    setUserModalIsShown(true);
  };

  const onHideUserModal = () => {
    setUserModalIsShown(false);
  };

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const signup = async (username, email, password) => {
    const mongoUser = await createUser(username, email, password);
    if (mongoUser) {
      await createUserWithEmailAndPassword(
        auth,
        mongoUser.user.email,
        mongoUser.user.password
      )
        .then(async (user) => {
          await updateProfile(auth.currentUser, { displayName: username });
          setCurrentUser({
            displayName: user.user.displayName,
            email: user.user.email,
            uid: user.user.uid,
          });
        })
        .catch((err) => {
          setError('Signup error!');
          clearError();
        });
      localStorage.setItem('token', mongoUser.token);
      setCurrentUser(mongoUser);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    return getAuth().signOut();
  };

  const firebaseLogin = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setAuthorized(true);
        localStorage.setItem('token', user.user.accessToken);
      }
    } catch (err) {
      console.log(err);
      setError('Invalid email address or password.');
      clearError();
    }
  };

  useEffect(() => {
    const authStateListener = () => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          setLoading(false);
          return setAuthorized(false);
        }
        setLoading(false);
        setCurrentUser(user);
        return setAuthorized(true);
      });
    };
    authStateListener();
  }, [authorized]);

  const contextValue = {
    userModalIsShown: userModalIsShown,
    showUserModal: onShowUserModal,
    hideUserModal: onHideUserModal,
    signup: signup,
    currentUser: currentUser,
    error: error,
    authorized: authorized,
    login: firebaseLogin,
    logout: logout,
    clearError: clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
