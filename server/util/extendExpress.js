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
    res.json({ data: data, message: message, code: CODE_SUCCESS, isError: false })
  };
  /**
   * 失败
   * @param message
   */
  res.error = (message) => {
    res.json({ message: message, code: CODE_SUCCESS, isError: true })
  };
  /**
   * json重定向
   * @param url
   * @param message
   * @param timeOut
   */
  res.jsonRedirect = (url, message, timeOut) => {
    res.json({ data: { __url: url, __timeOut: timeOut || 0 }, message: message, code: CODE_REDIRECT, isError: false })
  };
  /**
   * 判断是否为null或Undefined方法
   * @param obj
   * @returns {*}
   */
  req.isEmpty = (obj)=> {
    return Object.prototype.toString.call(obj) === '[object Null]' || Object.prototype.toString.call(obj) === '[object Undefined]' || obj === '';
  };

  next();
};
