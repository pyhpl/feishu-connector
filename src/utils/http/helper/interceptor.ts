import { AxiosInstance } from "axios";
import qs from "qs";
import {
  AUTH_TOKEN,
  AUTH_WHITE_URLS,
  getGOrigin,
  HTTP_CODE,
} from "../config/config";
import { getToken } from "../config/token";
import { GjMessage } from "@gj/atom";
import { CustomRequestConfig } from "../config/model";
import { useUserStoreOutside } from "@/store/modules/user";

/**
 * 统一http拦截
 */
export function interceptor(http: AxiosInstance) {
  requestInterceptor(http);
  responseInterceptor(http);
}

/**
 * 统一http请求拦截
 */
function requestInterceptor(http: AxiosInstance) {
  http.interceptors.request.use(
    (config: CustomRequestConfig) => {
      if (!AUTH_WHITE_URLS.some((url) => config.url?.includes(url))) {
        // 非白名单需设置token
        config.headers = config.headers || {};
        // config.headers[AUTH_TOKEN] = `Bearer ${getToken()}`;
        config.headers["g-origin"] = getGOrigin();
      }

      if (config.method === "get") {
        config.paramsSerializer = function (params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        };
      }

      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );
}

/**
 * 统一http响应拦截
 */
function responseInterceptor(http: AxiosInstance) {
  http.interceptors.response.use(
    async (response) => {
      if (response.data?.code === 302) {
        // TODO 刷新页面
        return Promise.reject();
      } else if (response.data?.code === 402) {
        // TODO 刷新页面
        return Promise.reject();
      }

      return response;
    },
    async (error) => {
      const {
        response,
        config,
        message,
      }: { response: any; config: CustomRequestConfig; message: any } = error;
      /**
       * 超时重试处理
       */
      if (error.code == "ECONNABORTED" && message.includes("timeout")) {
        GjMessage.error("请求超时");
        return Promise.reject(error);
      } else {
        /**
         * 接口状态异常
         */
        if (response?.status === HTTP_CODE.unauthorized) {
          // 重置用户
          const userStore = useUserStoreOutside();
          userStore.reset();
        }
        if (!config?.disableErrorMsg) {
          if (
            response?.data instanceof Blob &&
            response?.headers?.["content-type"] === "application/json"
          ) {
            /**
             * 部分接口在调用时已指定responseType为blob，
             * 当接口400报错时返回content-type: application/json，需要单独处理
             */
            blobToString(response.data, (str) => {
              errorMessage(str ? JSON.parse(str).messages : undefined);
            });
          } else {
            errorMessage(response?.data?.messages);
          }
        }

        return Promise.reject(response?.data);
      }
    }
  );
}

function errorMessage(messages: string[] | undefined) {
  GjMessage.error(messages?.[0] || "网络错误，请重试");
}

function blobToString(blob: Blob, onLoad: (str: string) => void) {
  const reader = new FileReader();
  reader.readAsText(blob, "utf-8");
  reader.onload = () => {
    onLoad(reader.result as string);
  };
}
