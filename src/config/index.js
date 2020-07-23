/** @format */

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
  // baseURL: "https://baobao.cctar.us/apis"
  baseURL: 'http://159.138.45.45:5001',
};

// 开启请求参数打印
export const CONSOLE_REQUEST_ENABLE = true;
// 开启响应参数打印
export const CONSOLE_RESPONSE_ENABLE = true;

// API 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: process.env.MOCK_URL, // mock地址
  mock: process.env.IS_MOCK, // 是否开启mock
  debug: false, // 是否开启debug模式
  sep: '/', // 接口调用分隔符
};
