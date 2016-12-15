/**
 * Created by haojiachen on 2016/11/30.
 */
import request from '../utils/request';

export async function queryDic(params) {
  return request.post('api/dic/query', params);
}

export async function createDic(params) {
  return request.post('api/dic', params);
}

export async function updateDic(params) {
  return request.put('api/dic', params);
}

export async function delDic(id) {
  return request.del(`api/dic/${id}`);
}

export async function isDicCodeExists(params) {
  return request.post('api/dic/exist', params);
}

export async function queryDicMx(id) {
  return request.get(`api/dic/${id}/mx`);
}

export async function createDicMx(params) {
  return request.post('api/dic/mx', params);
}

export async function updateDicMx(params) {
  return request.put('api/dic/mx', params);
}

export async function delDicMx(id) {
  return request.del(`api/dic/mx/${id}`);
}
export async function isDicMxCodeExists(params) {
  return request.post('api/dic/mx/exist', params);
}
