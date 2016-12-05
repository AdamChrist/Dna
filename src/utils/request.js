import fetch from 'dva/fetch';
import {hashHistory} from 'dva/router';
import querystring from 'querystring';
import FetchError from './fetchError';

const errorMessages = (res) => new FetchError(res.status, `${res.statusText}`, `${res.status} 错误`);

//格式化json数据
const formatJson = (k, v) => {
  if (v === undefined) {
    return '';
  }
  return v;
};

//检查401错误,跳转首页,清空cookie信息
const check401 = (res) => {
  if (res.status === 401) {
    return Promise.reject(
      new FetchError(401, '身份信息已过期!4秒后自动跳转..', '无权访问',
        () => {
          hashHistory.push('login');
        }));
  }
  return res;
};

const check404 = (res) => {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
};

function jsonParse(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json().then(result => {
      if (result) {
        if (result.success === true) {
          return result.data;
        } else {
          return Promise.reject(new FetchError(0, result.message));
        }
      }
      return null;
    })
  }
  else {
    return Promise.reject(errorMessages(res));
  }
}

const request = (url, options) => {
  const opts = { ...options };
  //Sending cookies
  opts.credentials = 'same-origin';
  opts.headers = {
    ...opts.headers,
    // 'x-auth-token': token,
    'Content-Type': 'application/json;charset=utf-8'
  };
  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .catch(error => {
      if (error instanceof FetchError) {
        throw error;
      }
      else {
        throw new FetchError(0, _.isString(error) ? error : error.message);
      }
    })
};


/**
 * post请求 在服务器新建一个资源。
 * @param url
 * @param data
 * @param options
 */
function post(url, data = {}, options) {
  return request(url, { ...options, method: 'POST', body: JSON.stringify(data, formatJson) })
}

/**
 * delete请求 从服务器删除资源。
 * @param url
 * @param options
 */
function del(url, options) {
  return request(url, { ...options, method: 'DELETE' });
}

/**
 * put请求 在服务器更新资源（客户端提供改变后的完整资源）。
 * @param url
 * @param data
 * @param options
 */
function put(url, data = {}, options) {
  return request(url, { ...options, method: 'PUT', body: JSON.stringify(data, formatJson) });
}
/**
 * patch请求 在服务器更新资源（客户端提供改变的属性）。
 * @param url
 * @param data
 * @param options
 */
function patch(url, data = {}, options) {
  return request(url, { ...options, method: 'PATCH', body: JSON.stringify(data, formatJson) });
}

/**
 * get请求 从服务器取出资源（一项或多项）。
 * @param url
 * @param data
 * @param options
 */
function get(url, data, options) {
  return request(`${url}${data ? '?' + querystring.stringify(data) : ''}`, { ...options, method: 'GET' });
}

export default { post, del, put, patch, get };
