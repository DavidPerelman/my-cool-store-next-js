import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  fetchAllProducts,
  fetchAllProductsByCategory,
  fetchContainerProductsByCategory,
  fetchProduct,
} from '../api/productsApi';

export const useAllProductsQuery = () => {
  const products = useQuery(['products'], () => {
    const result = fetchAllProducts();
    return result;
  });
  return products;
};

export const useProductsQuery = (categoryId) => {
  const products = useQuery(['products', categoryId], () => {
    const result = fetchAllProductsByCategory(categoryId);
    return result;
  });
  return products;
};

export const useContainerProductsQuery = (categoryId) => {
  const products = useQuery(['products', categoryId], () => {
    const result = fetchContainerProductsByCategory(categoryId);
    return result;
  });
  return products;
};

export const useSingleProductQuery = (productId) => {
  const products = useQuery(['product', productId], () => {
    const result = fetchProduct(productId);
    return result;
  });
  return products;
};

// const useOrder = (orderId) => {
//   const session = useContext(Context);
//   const token = session.storedValue.token;
//   const order = useQuery(['order', token, orderId], () => {
//     const result = getOrderDetails(token, orderId);
//     return result;
//   });

//   return order;
// };
