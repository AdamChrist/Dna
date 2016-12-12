import React from 'react';
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

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(IndexPage);
