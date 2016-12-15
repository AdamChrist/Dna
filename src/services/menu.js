/**
 * Created by  on 2016/12/8.
 */
import request from '../utils/request';

export async function query(params) {
  return request.post('api/menu/query', params);
}

export async function create(params) {
  return request.post('api/menu', params);
}

export async function update(params) {
  return request.put('api/menu', params);
}

export async function del(id) {
  return request.del(`api/menu/${id}`);
}

export async function isMenuExists(params) {
  return request.post('api/menu/exist', params);
}
