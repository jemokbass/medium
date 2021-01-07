import { useContext, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { CurrentUserContext } from '@/context/currentUser';
import useLocalStorage from '@/hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user'),
    [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      // return setCurrentUserState(state => ({ ...state, isLoggedIn: false }));
      dispatch({ type: 'SET_UNAUTHORIZED' });
      return;
    }
    doFetch();
    dispatch({ type: 'LOADING' });
    // setCurrentUserState(state => ({ ...state, isLoading: true }));
  }, [token, dispatch, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    // setCurrentUserState(state => ({
    //   ...state,
    //   isLoggedIn: true,
    //   isLoading: false,
    //   currentUser: response.user,
    // }));
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);

  return children;
};

export default CurrentUserChecker;
