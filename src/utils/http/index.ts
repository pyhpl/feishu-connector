import axios from 'axios';
import { getBaseUrl, HTTP_TIMEOUT } from './config/config';
import { interceptor } from './helper/interceptor';
import type { CustomRequestConfig } from './config/model';

/**
 * 创建axios实例
 */
const requestService = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  timeout: HTTP_TIMEOUT,
});

/**
 * 统一http拦截处理
 */
interceptor(requestService);

/**
 * 导出实例
 */
export const http = {
  async get<T>(
    url: string,
    params?: any,
    config?: CustomRequestConfig
  ): Promise<T> {
    const response = await requestService.get(url, {
      ...config,
      params,
    });
    return response.data;
  },
  async post<T, D = any>(
    url: string,
    data?: D,
    config?: CustomRequestConfig
  ): Promise<T> {
    const response = await requestService.post(url, data, config);
    return response?.data;
  },
  async put<T, D = any>(
    url: string,
    data?: D,
    config?: CustomRequestConfig
  ): Promise<T> {
    const response = await requestService.put(url, data, config);
    return response.data;
  },
  async delete<T>(
    url: string,
    params?: any,
    config?: CustomRequestConfig
  ): Promise<T> {
    const response = await requestService.delete(url, {
      ...config,
      params,
    });
    return response.data;
  },
  /**
   * origin request
   */
  request: requestService.request,
};

export { CustomRequestConfig };
export { setToken, getToken, removeToken } from './config/token';
