import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link, IndexRedirect} from 'dva/router';
import IndexPage from './routes/IndexPage';
import NotFound from './routes/NotFound';

import LoginPage from './routes/LoginPage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="login" />
        <Route path="app" component={IndexPage}>

        </Route>
        <Route path="/login" component={LoginPage} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
};
