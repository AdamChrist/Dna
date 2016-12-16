/**
 * Created by haojiachen on 2016/12/12.
 */
import React from 'react';
import {Menu, Dropdown, Icon} from 'antd';

const UserInfo = ({ userName = '', logout, changePwd }) => {
  const menu = (
    <Menu >
      <Menu.Item key="changePwd">
        <div onClick={() => changePwd()}><Icon type="edit" />{' '}修改密码</div>
      </Menu.Item>
      <Menu.Item key="logout">
        <div onClick={() => logout()}><Icon type="logout" />
          {' '}退出
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <span style={{ fontSize: '14px', cursor: 'pointer' }}>
        <Icon type="solution" style={{ fontSize: '22px' }} />{` ${userName} `}
      </span>
    </Dropdown>
  );
};

UserInfo.propTypes = {};
UserInfo.defaultProps = {};

export default UserInfo;
