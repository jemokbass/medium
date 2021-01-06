import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CurrentUserContext } from '@/context/currentUser';
import ErrorMessages from '@/components/ErrorMessages/ErrorMessages';

const AuthenticationPage = props => {
  const isLogin = props.match.path === '/login',
    pageTitle = isLogin ? 'Sign In' : 'Sign Up',
    descriptionLink = isLogin ? '/register' : '/login',
    descriptionText = isLogin ? 'Need an account?' : 'Have an account?',
    apiUrl = isLogin ? '/users/login' : '/users';

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [{ response, isLoading, error }, doFetch] = useFetch(apiUrl),
    [username, setUsername] = useState(''),
    [isSuccessfulSubmit, setSuccessfulSubmit] = useState(''),
    [, setToken] = useLocalStorage('token'),
    [, setCurrentUserState] = useContext(CurrentUserContext);

  const onSubmitHandler = event => {
    event.preventDefault();
    const user = isLogin ? { email, password } : { username, email, password };
    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setToken(response.user.token);
    setSuccessfulSubmit(true);
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setToken, setCurrentUserState]);

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={onSubmitHandler}>
              {error && <ErrorMessages backendErrors={error.errors} />}
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value.trim())}
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value.trim())}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-lg pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
