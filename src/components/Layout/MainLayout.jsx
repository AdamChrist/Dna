import React, {Component, PropTypes} from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import MainMenu from './MainMenu';
import UserInfo from './UserInfo';
import ChangePwdModal from './ChangePwdModal';

class MainLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapse: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'common/getUserInfo' })
  }

  handleClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    })
  };

  render() {
    const { children, common, location, dispatch } = this.props;

    const { user, pwdModalVisible } = common;

    const menuProps = { common, location };

    const userInfoProps = {
      userName: user.name,
      logout(){
        dispatch({ type: 'common/logout' });
      },
      changePwd(){
        dispatch({ type: 'common/showPwdModal' });
      }
    };

    const pwdModalProps = {
      pwdModalVisible,
      onOk(data){
        dispatch({
          type: 'common/changePwd',
          payload: data
        });
      },
      onCancel(){
        dispatch({
          type: 'common/hidePwdModal'
        });
      }
    };

    const ModalGen = () => <ChangePwdModal {...pwdModalProps} />;

    return (
      <div className="ant-layout">
        <aside className={this.state.collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-sider"}>
          <div className="ant-layout-logo">
            {/*DNA 后台管理系统*/}
            <div className="ant-layout-logo-img"></div>
          </div>
          <MainMenu {...menuProps} />
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
            <div className="ant-layout-action" onClick={this.handleClick}>
              <Icon type="bars" />
            </div>
            <div className="ant-layout-info">
              <UserInfo {...userInfoProps} />
              <ModalGen />
            </div>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {children}
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

const mapStateToProps = ({ common }) => {
  return { common };
};
//由于使用父组件的属性会导致modal刷新.所以重新连接redux
export default connect(mapStateToProps)(MainLayout);
