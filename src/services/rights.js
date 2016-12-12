/**
 * Created by haojiachen on 2016/12/12.
 */
import request from '../utils/request';

export async function query(params) {
  return request.post('api/rights/query', params);
}

export async function save(params) {
  return request.post('api/rights', params);
}

export async function del(id) {
  return request.del(`api/rights/${id}`);
}

export async function isRightsExists(params) {
  return request.post('api/rights/exist', params);
}
