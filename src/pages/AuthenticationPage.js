import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';

const AuthenticationPage = props => {
  const isLogin = props.match.path === '/login',
    pageTitle = isLogin ? 'Sign In' : 'Sign Up',
    descriptionLink = isLogin ? '/register' : '/login',
    descriptionText = isLogin ? 'Need an account?' : 'Have an account?',
    apiUrl = isLogin ? '/users/login' : '/users';
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [{ response, isLoading, error }, doFetch] = useFetch(apiUrl),
    [username, setUsername] = useState('');

  console.log('myau', response, isLoading, error);

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
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
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
                  onChange={e => setPassword(e.target.value)}
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
