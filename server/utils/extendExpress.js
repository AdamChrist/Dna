/**
 * Created by haojiachen on 2016/7/8.
 */
/**
 * express 中间件
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {

  const CODE_SUCCESS = 200,//通讯正常
    CODE_REDIRECT = 307,//重定向
    CODE_UNAUTHORIZED = 401;//未授权
  /**
   * 成功
   * @param data
   * @param message
   */
  res.success = (data, message) => {
    res.json({ data: data, message: message, code: CODE_SUCCESS, success: true })
  };
  /**
   * 失败
   * @param message
   */
  res.error = (message) => {
    res.json({ message: message, code: CODE_SUCCESS, success: false })
  };
  /**
   * json重定向
   * @param url
   * @param message
   * @param timeOut
   */
  res.jsonRedirect = (url, message, timeOut) => {
    res.json({ data: { __url: url, __timeOut: timeOut || 0 }, message: message, code: CODE_REDIRECT, success: true })
  };
  /**
   * 判断是否为null或Undefined方法
   * @param obj
   * @returns {*}
   */
  req.isEmpty = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Null]' || Object.prototype.toString.call(obj) === '[object Undefined]' || obj === '';
  };

  /**
   * 构造分页查询
   * @param pageIndex 初始页
   * @param pageSize 每页条数 默认为0 不分页
   * @param orderBy 排序列
   * @param asc 升序or降序
   * @param condition 查询条件
   * @returns {{where: (*|{}), order: string}}
   */
  req.queryFilter = ({ pageIndex = 1, pageSize = 0, orderBy = 'createdAt', asc = false, ...condition }) => {
    const filter = {
      where: condition || {},
      order: `${orderBy} ${asc ? 'ASC' : 'DESC'}`
    };
    if (pageSize && pageSize > 0) {
      filter.offset = (pageIndex - 1) * pageSize;
      filter.limit = pageSize;
    }
    return filter;
  };

  next();
};
