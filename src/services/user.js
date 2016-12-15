/**
 * Created by haojiachen on 2016/11/30.
 */
import request from '../utils/request';

export async function query(params) {
  return request.post('api/user/query', params);
}

export async function create(params) {
  return request.post('api/user', params);
}

export async function update(params) {
  return request.put('api/user', params);
}

export async function del(id) {
  return request.del(`api/user/${id}`);
}

/**
 * 用户名是否存在
 * @param params
 * @returns {*}
 */
export async function isUserExists(params) {
  return request.post('api/user/exist', params);
}
