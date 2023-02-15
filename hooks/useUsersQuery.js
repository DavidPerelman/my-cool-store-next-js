import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useUsersQuery = (url) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
  };
};

export default useUsersQuery;
