import { AxiosRequestConfig } from 'axios';

export interface CustomRequestConfig extends AxiosRequestConfig {
  /**
   * 禁用非200状态时的错误消息（默认true）
   */
  disableErrorMsg?: boolean;
  /**
   * 请求重试次数（默认3）
   */
  retry?: number;
}
