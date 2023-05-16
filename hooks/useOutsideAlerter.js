import { useEffect } from 'react';

export const useOutsideAlerter = (ref, results, setResults) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        ref.current.children[0].children[1].value = '';
        setResults([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setResults]);
  return results;
};
