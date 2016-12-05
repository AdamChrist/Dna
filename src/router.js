import React from 'react';
import {Router, Route, IndexRoute, Link, IndexRedirect} from 'dva/router';
import {requireAuth, autoLogin} from './utils/authUtil';
import IndexPage from './routes/IndexPage';
import NotFound from './routes/NotFound';
import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import UserPage from './routes/UserPage';


export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path='/'>
        <IndexRedirect to='login' />
        <Route path='app' component={IndexPage} onEnter={requireAuth}>
          <IndexRedirect to='home' />
          <Route path='home' component={HomePage} />
          <Route path='user' component={UserPage} />
        </Route>
        <Route path='/login' component={LoginPage} onEnter={autoLogin} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  );
};
