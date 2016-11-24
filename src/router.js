import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link, IndexRedirect} from 'dva/router';

import IndexPage from './routes/IndexPage';
import NotFound from './routes/NotFound';
import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';

import Example from './components/Example';


export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path='/'>
        <IndexRedirect to='login' />
        <Route path='app' component={IndexPage}>
          <IndexRedirect to='home' />
          <Route path='home' component={HomePage} />
        </Route>
        <Route path='/login' component={LoginPage} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  );
};
