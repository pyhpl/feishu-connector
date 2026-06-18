export interface CustomResponse<T> {
  code: number; // 状态码
  data: T; // 响应数据
  msg?: string; // 消息
}
