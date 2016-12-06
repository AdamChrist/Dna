import React from 'react';
import {Card, Tree, Button, Popconfirm, Row} from 'antd';

const DicTree = ({ dicList, dicSelectKeys, onAdd, onDelete, onEdit, onSelect }) => {

  const loop = (data) => data.map((item) => {
    return <Tree.TreeNode key={item.id} title={`${item.name}(${item.code})`} code={item.code} />;
  });
  //点击树节点触发
  const handleSelect = (selectedKeys, e) => {
    if (e.selected) {
      onSelect(selectedKeys[0]);
    }
  };
  //按钮是否可以用
  const disabled = dicSelectKeys === '';

  return (
    <Card title="数据字典" style={{ width: '300px' }}>
      <Row type="flex" justify="center" className='ant-btn-bar'>
        <Button type="primary" onClick={() => onAdd()}>新增</Button>
        <Button onClick={() => onEdit(dicSelectKeys)} disabled={disabled}>编辑</Button>
        <Popconfirm title={'确认删除数据字典?'} placement="rightTop" onConfirm={() => onDelete(dicSelectKeys)}>
          <Button disabled={disabled}>删除</Button>
        </Popconfirm>
      </Row>
      <Tree selectedKeys={[dicSelectKeys]} onSelect={handleSelect}>
        {loop(dicList)}
      </Tree>
    </Card>
  );
};

DicTree.propTypes = {};
DicTree.defaultProps = {};

export default DicTree;
