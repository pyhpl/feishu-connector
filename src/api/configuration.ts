import { Configuration } from "@/model/configuration";
import { CustomResponse } from "@/model/http";
import { http } from "@/utils/http";
import { bitable } from "@lark-base-open/connector-api";

const CONFIG_KEY = "config";

export async function getUserId(): Promise<string> {
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("1");
      }, 500);
    });
  } else {
    const userId = await bitable.getUserId();

    console.log(`userId: ${userId}`);

    return userId;
  }
}

export async function getConfiguration(): Promise<Configuration> {
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const config = localStorage.getItem(CONFIG_KEY);
        if (config) {
          return resolve(JSON.parse(config));
        } else {
          return resolve({});
        }
      }, 500);
    });
  } else {
    const config = await bitable.getConfig();

    console.log(`config: ${JSON.stringify(config)}`);

    return (config || {}) as any;
  }
}

export async function setConfiguration(params: Configuration) {
  if (process.env.NODE_ENV === "development") {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(params));
        resolve();
      }, 500);
    });
  } else {
    return bitable.saveConfigAndGoNext(params);
  }
}

export function getDataModule(baseUserId = "") {
  return http.get<CustomResponse<any[]>>(
    `${process.env.API_PREFIX}/getDataModule`,
    { baseUserId },
  );
}

export function getUserInfo(params: any) {
  return http.post<CustomResponse<{ baseUserName: string }>>(
    `${process.env.API_PREFIX}/getUserInfo`,
    params,
  );
}

export function getTableMeta(params: any) {
  return http.post<CustomResponse<any>>(
    `${process.env.API_PREFIX}/getTableMeta`,
    params,
  );
}

export function changeUsername(params: any) {
  return http.post<CustomResponse<any>>(
    `${process.env.API_PREFIX}/changeUserName`,
    params,
  );
}

export function bindFeishu(params: any) {
  return http.post<CustomResponse<any>>(
    `${process.env.API_PREFIX}/bindFeishu`,
    params,
  );
}
