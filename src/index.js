import React from 'react';
import ReactDOM from 'react-dom';
import '@/common/styles/index.scss';
import App from '@/common/app/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
