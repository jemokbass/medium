import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticlePage from '@/pages/ArticlePage';
import GlobalFeedPage from '@/pages/GlobalFeedPage';
import AuthenticationPage from '@/pages/AuthenticationPage';
import TagFeedPage from '@/pages/TagFeedPage';
import YourFeedPage from '@/pages/YourFeedPage';
import CreateArticlePage from '@/pages/CreateArticlePage';
import EditArticlePage from '@/pages/EditArticlePage.';
import SettingsPage from '@/pages/SettingsPage';

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeedPage} />
    <Route path="/feed" component={YourFeedPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/tags/:slug" component={TagFeedPage} />
    <Route path="/article/new" component={CreateArticlePage} />
    <Route path="/articles/:slug/edit" component={EditArticlePage} />
    <Route path="/login" component={AuthenticationPage} />
    <Route path="/register" component={AuthenticationPage} />
    <Route path="/articles/:slug" component={ArticlePage} />
  </Switch>
);
