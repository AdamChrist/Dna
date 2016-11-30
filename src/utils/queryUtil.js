/**
 * Created by haojiachen on 2016/11/30.
 */
/**
 * 格式化查询表达式 (for sequelize)
 * @param op
 * @param value
 * @returns {string}
 */
const formatExpression = (op, value) => {
  let result = '';
  switch (op) {
    case '$like':
      result = '%' + value + '%';
      break;
    case '$likeRight':
      result = value + '%';
      break;
    case '$likeLeft':
      result = '%' + value;
      break;
    default:
      result = value;
      break;
  }
  return result;
};

/**
 * 格式化查询参数(for sequelize)
 * 关联查询filed用#分割 : $user#deptName$.$like
 * @param params
 * @returns {{}}
 */
const formatQuery = (params) => {
  const result = {};
  for (let [k, v] of Object.entries(params)) {
    Object.keys(v).forEach(key => {
      const value = v[key];
      if (value) {
        if (_.isArray(value) && value.every(x => x === null)) {
          return;
        }
        const newKey = k.replace('#', '.');
        result[newKey] = { [key]: formatExpression(key, value) };
      }
    });
  }
  return result;
};

export {formatQuery, formatExpression};
