import React from 'react';
import {Router, Route, IndexRoute, Link, IndexRedirect} from 'dva/router';
import {requireAuth, autoLogin} from './utils/authUtil';
import LoginPage from './routes/Common/LoginPage';
import NotFound from './routes/Common/NotFound';
import IndexPage from './routes/Layout/IndexPage';
import HomePage from './routes/Common/HomePage';
import UserPage from './routes/System/UserPage';
import DicPage from './routes/System/DicPage';
import RolePage from './routes/System/RolePage';
import MenuPage from './routes/System/MenuPage';
import RightsPage from './routes/System/RightsPage';

export default  ({ history }) => {
  return (
    <Router history={history}>
      <Route path='/'>
        <IndexRedirect to='login' />
        <Route path='app' component={IndexPage} onEnter={requireAuth}>
          <IndexRedirect to='home' />
          <Route path='home' component={HomePage} />
          <Route path='user' component={UserPage} />
          <Route path='dic' component={DicPage} />
          <Route path='role' component={RolePage} />
          <Route path='menu' component={MenuPage} />
          <Route path='rights' component={RightsPage} />
        </Route>
        <Route path='/login' component={LoginPage} onEnter={autoLogin} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  );
};
