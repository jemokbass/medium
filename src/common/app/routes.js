import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticlePage from '@/pages/ArticlePage';
import GlobalFeedPage from '@/pages/GlobalFeedPage';
import AuthenticationPage from '@/pages/AuthenticationPage';
import TagFeedPage from '@/pages/TagFeedPage';
import YourFeedPage from '@/pages/YourFeedPage';

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeedPage} />
    <Route path="/feed" component={YourFeedPage} />
    <Route path="/tags/:slug" component={TagFeedPage} />
    <Route path="/articles/:slug" component={ArticlePage} />
    <Route path="/login" component={AuthenticationPage} />
    <Route path="/register" component={AuthenticationPage} />
  </Switch>
);
