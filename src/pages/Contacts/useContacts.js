import { useEffect, useState } from 'react';
export const useContacts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=10');
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    getContacts();
  }, []);
  return {
    data,
    loading,
    error,
  };
};
