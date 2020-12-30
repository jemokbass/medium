import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticlePage from '@/pages/ArticlePage';
import GlobalFeedPage from '@/pages/GlobalFeedPage';
import AuthenticationPage from '@/pages/AuthenticationPage';

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeedPage} />
    <Route path="/articles/:slug" component={ArticlePage} />
    <Route path="/login" component={AuthenticationPage} />
    <Route path="/register" component={AuthenticationPage} />
  </Switch>
);
