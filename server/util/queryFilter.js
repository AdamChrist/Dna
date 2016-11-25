// 构造成基本的分页查询对象
module.exports = function ({ pageIndex = 1, pageSize = 0, ...condition }) {
  const filter = {
    where: condition || {},
    order: 'createdAt DESC'
  };
  if (pageSize && pageSize > 0) {
    filter.offset = ((pageIndex - 1) * pageSize);
    filter.limit = pageSize;
  }
  return filter;
};
