import React, {Component, PropTypes} from 'react';
import {Icon, Spin} from 'antd';

import MainMenu from './MainMenu';

class MainLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapse: false
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch({type: 'common/getUserInfo'})
  }

  handleClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    })
  };

  render() {
    const {children, ...childrenPros} = this.props;

    return (
      <div className="ant-layout">
        <aside className={this.state.collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-sider"}>
          <div className="ant-layout-logo">
            {/*DNA 后台管理系统*/}
            <div className="ant-layout-logo-img"></div>
          </div>
          <MainMenu />
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
            <div className="ant-layout-action" onClick={this.handleClick}>
              <Icon type="bars"/>
            </div>
            <div className="ant-layout-info">
              欢迎XXXX
            </div>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <Spin size="large" spinning={childrenPros.loading.global}>
                {React.cloneElement(React.Children.only(children), childrenPros)}
              </Spin>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;

