import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let jsonValue;

    if (typeof window !== 'undefined') {
      // Perform localStorage action
      jsonValue = localStorage.getItem(key);
    }
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof jsonValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
