import { AUTH_TOKEN } from './config';

/**
 * 获取token
 */
export function getToken() {
  return localStorage.getItem(AUTH_TOKEN) || '';
}

/**
 * 设置token
 */
export function setToken(token: string) {
  localStorage.setItem(AUTH_TOKEN, token);
}

/**
 * 清除token
 */
export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN);
}
