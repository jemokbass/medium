import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '@/context/currentUser';
import useFetch from '@/hooks/useFetch';
import ErrorMessages from '@/components/ErrorMessages/ErrorMessages';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Redirect } from 'react-router-dom';

const SettingsPage = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext),
    apiUrl = '/user',
    [{ response, error }, doFetch] = useFetch(apiUrl),
    [image, setImage] = useState(''),
    [username, setUsername] = useState(''),
    [bio, setBio] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [, setToken] = useLocalStorage('token'),
    [isSuccessfulLogout, setIsSuccessfulLogout] = useState(false);

  const submitHandler = event => {
    event.preventDefault();
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password,
        },
      },
    });
  };

  const logout = event => {
    event.preventDefault();
    setToken('');
    dispatch({
      type: 'LOGOUT',
    });
    setIsSuccessfulLogout(true);
  };

  useEffect(() => {
    if (!currentUserState.currentUser) return;

    setImage(currentUserState.currentUser.image);
    setUsername(currentUserState.currentUser.username);
    setBio(currentUserState.currentUser.bio);
    setEmail(currentUserState.currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) return;
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);

  if (isSuccessfulLogout) {
    return <Redirect to="/" />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {error && <ErrorMessages backendErrors={error.errors} />}
            <form onSubmit={submitHandler}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile pictures"
                    value={image}
                    onChange={e => {
                      setImage(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={9}
                    placeholder="Short BIO"
                    value={bio}
                    onChange={e => {
                      setBio(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={logout}
            >
              Click for Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
