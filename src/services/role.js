/**
 * Created by haojiachen on 2016/12/7.
 */
import request from '../utils/request';

export async function query(params) {
  return request.post('api/role/query', params);
}

export async function create(params) {
  return request.post('api/role', params);
}

export async function update(params) {
  return request.put('api/role', params);
}

export async function del(id) {
  return request.del(`api/role/${id}`);
}

export async function isRoleExists(params) {
  return request.post('api/role/exist', params);
}
export async function saveRoleMenu(params) {
  return request.post('api/role/menu', params);
}
export async function saveRoleRights(params) {
  return request.post('api/role/rights', params);
}
