export interface CustomResponse<T> {
  code: number; // 状态码
  data: T; // 响应数据
  message?: {
    zh: string;
    en: string;
  }; // 消息
}
