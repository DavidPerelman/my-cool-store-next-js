import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CategoriesContext = createContext({
  getCategories: () => {},
  categories: [],
  clearError: () => {},
});

export const CategoriesContextProvider = (props) => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const categoriesCollectionRef = collection(db, 'categories');

  useEffect(() => {
    getCategories();
  }, []);

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const getCategories = async () => {
    const response = await fetch(`api/categories`);
    const data = await response.json();

    setCategories(data.categories);

    // await getDocs(categoriesCollectionRef)
    //   .then((data) => {
    //     setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   })
    //   .catch((err) => {
    //     setError('error!');
    //     clearError();
    //   });
  };

  const contextValue = {
    getCategories: getCategories,
    categories: categories,
    clearError: clearError,
  };

  return (
    <CategoriesContext.Provider value={contextValue}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
