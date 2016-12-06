import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';

class MainMenu extends Component {
  render() {
    return (
      <Menu mode="inline" theme="dark" defaultOpenKeys={['sys']}>
        <Menu.SubMenu key="sys" title={<span><Icon type="desktop" />系统管理</span>}>
          <Menu.Item key="user"><Link to="/app/user">用户管理</Link></Menu.Item>
          <Menu.Item key="role"><Link to="/app/role">角色管理</Link></Menu.Item>
          <Menu.Item key="menu"><Link to="/app/menu">菜单管理</Link></Menu.Item>
          <Menu.Item key="auth"><Link to="/app/auth">权限管理</Link></Menu.Item>
          <Menu.Item key="dic"><Link to="/app/dic">数据字典</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" title={<span><Icon type="laptop"/>导航二</span>}>
          <Menu.Item key="5">选项5</Menu.Item>
          <Menu.Item key="6">选项6</Menu.Item>
          <Menu.Item key="7">选项7</Menu.Item>
          <Menu.Item key="8">选项8</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" title={<span><Icon type="notification"/>导航三</span>}>
          <Menu.Item key="9">选项9</Menu.Item>
          <Menu.Item key="10">选项10</Menu.Item>
          <Menu.Item key="11">选项11</Menu.Item>
          <Menu.Item key="12">选项12</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

MainMenu.propTypes = {};
MainMenu.defaultProps = {};

export default MainMenu;
