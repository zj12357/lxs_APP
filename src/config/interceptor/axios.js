/** @format */

import axios from 'axios';
import uuid from 'uuid';
import {modal} from '@/utils';
import {CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE} from '../index';
import store from '@/store/store';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

// import { Navigation } from "@/router";
const CancelToken = axios.CancelToken;
let CancelPromise = {};

/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export async function requestSuccessFunc(req) {
  console.log(req, 'req');

  let res = await store.getState().persist.token;
  console.log(res, 'token');
  // req.headers['X-APIS-SID'] = session_id;
  // req.headers['X-APIS-Version'] = 'v3';
  req.headers.Authorization = res;
  console.log(req.headers, 'tokentoken');
  // req.headers['X-APIS-Application'] = 'usercenter';
  //取消重复请求

  if (CancelPromise[req.url]) {
    CancelPromise[req.url]();
  }

  req.cancelToken = new CancelToken(c => {
    CancelPromise[req.url] = c;
  });

  CONSOLE_REQUEST_ENABLE &&
    console.info('requestInterceptorFunc', `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  console.log(reqError, 'resError');
  getNet(reqError);
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc(response) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  CONSOLE_RESPONSE_ENABLE && console.info('responseInterceptorFunc', response);
  if (response && response.data) {
    return response.data;
  } else {
    // 异常处理
    console.log('warning', response.data.message);
    return Promise.reject(
      'error：' + (response && response.data && response.data.message),
    );
  }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  //如果是取消，返回空，前端不提示消息
  if (resError.toString() == 'Cancel') {
    resError = '';
  }
  getNet(resError);
  console.log('fail', resError, resError.response);

  // if (resError.response.status === 500 || resError.response.status === 417) {

  return Promise.reject(resError);
}

function getNet(resError) {
  let timeout = resError.message.includes('timeout');
  NetInfo.fetch().then(state => {
    let {isConnected} = state;
    if (!isConnected || timeout) {
      Alert.alert('您的网络状况不佳，请检查网络');
    }
  });
}
