import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default url => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false),
    [response, setResponse] = useState(null),
    [error, setError] = useState(null),
    [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;
    axios(baseUrl + url, options)
      .then(res => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data);
      });
  }, [isLoading]);

  return [{ isLoading, response, error }, doFetch];
};
