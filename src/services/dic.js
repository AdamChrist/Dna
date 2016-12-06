/**
 * Created by haojiachen on 2016/11/30.
 */
import request from '../utils/request';

export async function queryDic(params) {
  return request.post('api/dic/query', params);
}

export async function saveDic(params) {
  return request.post('api/dic', params);
}

export async function delDic(id) {
  return request.del(`api/dic/${id}`);
}

export async function isDicCodeExists(params) {
  return request.post('api/dic/exist', params);
}
