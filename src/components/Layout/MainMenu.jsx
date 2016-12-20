import React from 'react';
import {Link} from 'dva/router';
import {Menu, Icon} from 'antd';
import {convertToTree, sortTree} from '../../utils/converter';

const MainMenu = ({common, location}) => {
  const {user} = common;
  const menus = user.menus || [];
  //根据router选中对应的菜单
  const selectedKeys = menus.filter(n => n.url === location.pathname).map(n => n.code);
  //菜单专成树形结构并排序
  const treeList = sortTree(convertToTree(menus).filter((n) => {
    return !n.pid;
  }));
  //输出菜单
  const loop = (data) => data.map((n) => {
    if (n.children && n.children.length > 0) {
      return (
        <Menu.SubMenu key={n.code} title={<span>{n.icon ? <Icon type={n.icon}/> : ''}{n.name}</span>}>
          {loop(n.children)}
        </Menu.SubMenu>
      );
    }
    return <Menu.Item key={n.code}><Link to={n.url}>{n.icon ? <Icon type={n.icon}/> : ''}{n.name}</Link></Menu.Item>;
  });

  return (
    <Menu mode="inline" theme="dark" defaultOpenKeys={['sys']} selectedKeys={selectedKeys}>
      {loop(treeList)}
    </Menu>
  );
};

MainMenu.propTypes = {};
MainMenu.defaultProps = {};

export default MainMenu;

