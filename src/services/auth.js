/**
 * Created by haojiachen on 2016/11/25.
 */
import request from '../utils/request';

export async function login(user) {
  return request.post('api/auth/login', user);
}
export async function logout() {
  return request.post('api/auth/logout');
}
export async function getUserInfo(user) {
  return request.get('api/auth/user');
}

