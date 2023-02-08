import React, { createContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';

const ProductContext = createContext({
  products: [],
  product: null,
  getProduct: (productId) => {},
  createProduct: (product) => {},
  getProductsByCategory: () => {},
  // clearError: () => {},
});

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const { isLoading, error, sendRequest: fetchProduct } = useHttp();

  const getProduct = async (productId) => {
    const transformProduct = (productObj) => {
      setProduct(productObj.product);
    };

    fetchProduct(
      {
        url: `/api/products/product/${productId}`,
      },
      transformProduct
    );
  };

  const contextValue = {
    product: product,
    getProduct: getProduct,
    // createProduct: createProduct,
    // getProductsByCategory: getProductsByCategory,
    // clearError: clearError,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
