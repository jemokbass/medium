import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const useFetch = url => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false),
    [response, setResponse] = useState(null),
    [error, setError] = useState(null),
    [options, setOptions] = useState({}),
    [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };
    if (!isLoading) return;
    axios(baseUrl + url, requestOptions)
      .then(res => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};

export default useFetch;
