import { AxiosInstance } from 'axios';
import { isNil } from 'lodash-es';
import { CustomRequestConfig } from '../config/model';

/**
 * 请求重试
 */
export class HttpRetryer {
  private http: AxiosInstance;
  private config: CustomRequestConfig;
  private error: any;

  constructor(http: AxiosInstance, config: CustomRequestConfig, error: any) {
    this.http = http;
    this.config = config;
    this.error = error;
  }

  public async retry() {
    /**
     * 重试间隔时间
     */
    const backoff = new Promise<void>((resolve) => {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
    /**
     * 重试次数（默认3次）
     */
    if (isNil(this.config.retry)) {
      this.config.retry = 2;
    } else {
      this.config.retry -= 1;
    }
    /**
     * 重试
     */
    if (this.config.retry > 0) {
      await backoff;
      return await this.http(this.config);
    } else {
      return Promise.reject(this.error);
    }
  }
}
