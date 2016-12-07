/**
 * 把线性结构的数据转为antd的树形结构
 * @param array 线性数组
 * @param pid   父ID的字段
 * @param childrenName children的字段
 * @returns {Array} 树形数组
 */
export const convertToTree = (array, pid = 'pid', childrenName = 'children') => {

  const targetData = [];
  //克隆
  const list = _.cloneDeep(array);

  for (const i in list) {
    const currentData = list[i];
    // 父节点
    const parentData = _.find(list, { id: currentData[pid] });
    // 如果没有父节点.则为跟节点
    if (!parentData) {
      targetData.push(currentData);
      continue;
    }
    parentData[childrenName] = parentData[childrenName] || [];
    parentData[childrenName].push(currentData);
  }
  return targetData;
};
