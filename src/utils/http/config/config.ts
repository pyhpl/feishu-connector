/**
 * http auth token header
 */
export const AUTH_TOKEN = "Authorization";

/**
 * 请求超时时间
 */
export const HTTP_TIMEOUT = 300000;

/**
 * 不需要认证的api
 */
export const AUTH_WHITE_URLS = ["/api/user/login"];

/**
 * HTTP code
 */
export enum HTTP_CODE {
  success = 200,
  unauthorized = 401,
}

/**
 * 获取请求的base url
 */
export function getBaseUrl() {
  return "https://gatewayuat.apist.gerpgo.com";
}

/**
 * 获取请求的base url
 */
export function getGOrigin() {
  return "https://yufabu3.localtest.gerpgo.com";
}
