import React from 'react';
import ReactDOM from 'react-dom';
import '@/common/styles/index.scss';
import App from '@/common/app/App';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from './context/currentUser';
import CurrentUserChecker from './common/currentUserChecker';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
