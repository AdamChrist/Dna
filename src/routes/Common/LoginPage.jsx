import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import styles from './LoginPage.less';

import {LoginForm} from '../components/Login';

const LoginPage = () => {
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-content']}>
        <div className={styles['login-logo']} />
        <LoginForm />
      </div>

    </div>
  );
};

export default connect()(LoginPage);
