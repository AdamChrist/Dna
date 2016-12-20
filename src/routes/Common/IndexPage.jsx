import React from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';
import MainLayout from '../../components/Layout/MainLayout';

const IndexPage = ({ children, loading, location }) => {
  return (
    <Spin spinning={loading.global} size='large' tip="载入中...">
      <MainLayout location={location}>
        {children}
      </MainLayout>
    </Spin>
  );
};

IndexPage.propTypes = {};

const mapStateToProps = ({ loading }) => {
  return { loading };
};

export default connect(mapStateToProps)(IndexPage);
