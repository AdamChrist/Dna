import React from 'react';
import {Card, Tree, Button, Popconfirm, Row} from 'antd';

const DicTree = ({ dicList, dicSelectKey, onAdd, onDelete, onEdit, onSelect }) => {

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
  const disabled = dicSelectKey === '';

  return (
    <Card title="数据字典">
      <Row type="flex" justify="center" className='ant-table-title'>
        <Button type="primary" onClick={() => onAdd()}>新增</Button>
        <Button onClick={() => onEdit(dicSelectKey)} disabled={disabled}>编辑</Button>
        <Popconfirm title={'确认删除数据字典?'} placement="rightTop" onConfirm={() => onDelete(dicSelectKey)}>
          <Button disabled={disabled}>删除</Button>
        </Popconfirm>
      </Row>
      <Tree selectedKeys={[dicSelectKey]} onSelect={handleSelect}>
        {loop(dicList)}
      </Tree>
    </Card>
  );
};

DicTree.propTypes = {};
DicTree.defaultProps = {};

export default DicTree;
