/**
 * Created by haojiachen on 2016/11/30.
 */
import request from '../utils/request';

export async function query(params) {
  return request.post('api/user/query', params);
}

export async function save(params) {
  return request.post('api/user', params);
}

export async function del(params) {
  return request.del('api/user', params);
}
