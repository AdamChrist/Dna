import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import MainLayout from '../Layout/MainLayout';

const IndexPage = ({ children, ...props }) => {
  return (
    <MainLayout {...props}>
      {children}
    </MainLayout>
  );
};

IndexPage.propTypes = {};

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(IndexPage);
