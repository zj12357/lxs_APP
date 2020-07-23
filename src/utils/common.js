import {
  Dimensions,
  View,
  Platform,
  PixelRatio,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import store from '@/store/store';
import React, {Component} from 'react';
import {MeiqiaShow} from 'meiqia-react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';
import $api from '@/config/api';
import {NativeModules, NativeEventEmitter} from 'react-native';
const tximBridge = NativeModules.TXIMBridge;
const tximEmitter = new NativeEventEmitter(tximBridge);

moment.locale('zh-cn');

import {AXIOS_DEFAULT_CONFIG} from '@/config';

// import ImageViewer from 'react-native-image-zoom-viewer';

const DESIGN_WIDTH = 750;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
// ---function---
export function transformSize(designSize) {
  const number = (designSize / DESIGN_WIDTH) * SCREEN_WIDTH;

  let remainder = number % 1;
  const int = number - remainder;
  // 防止非标准Android屏，不做处理
  if (
    Platform.OS === 'android' &&
    parseInt(PixelRatio.get()) !== PixelRatio.get()
  ) {
  } else {
    remainder =
      remainder >= 0.25 && remainder < 0.75 ? 0.5 : Math.round(remainder);
  }
  return int + remainder;
}

/**
 * 默认图片，用于拼接图片地址&填充默认图片
 * @data {string} 图片地址
 * @isPic {boolean} 是否是图片模式，默认为头像模式
 */
export function checkImg(data) {
  if (data) {
    if (data.includes('http') || data.includes('file://')) {
      return data;
    } else {
      //   let base = AXIOS_DEFAULT_CONFIG.baseURL.replace(/\/apis/, "");
      //   let base = "https://erp.wholerengroup.com";
      let base = 'http://159.138.45.45:5001';
      return base + data;
    }
  }
}

export function formatMoney(number) {
  let value = number
    .toString()
    .split('')
    .reverse();
  value.forEach((item, index) => {
    if ((index + 1) % 4 === 0) {
      value.splice(index, 0, ',');
    }
  });
  value.reverse().join();
  return value;
}

export async function changeStore(type, keyName, data) {
  await store.dispatch({type, payload: {[keyName]: data}});
}

/**
 * 时间戳转日期格式
 * @timeStamp {number} 时间戳
 * @format {string} 格式[完整格式：yyyy-MM-dd HH:mm:ss，默认yyyy-MM-dd]
 */

export function formatTime(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern);
}

export function diffTime(time) {
  const date1 = moment();

  const date2 = moment(time);
  const date3 = date2.diff(date1, 'minute'); //计算相差的分钟数
  const h = Math.floor(date3 / 60); //相差的小时数
  const mm = date3 % 60; //计算相差小时后余下的分钟数
  console.log(time, date1, date2, date3, h, mm);
  return `${h}:${mm}`;
}

export function percentTime(begin, end) {
  const date1 = moment();

  const date2 = moment(begin);

  const date3 = moment(end);

  const diff1 = date1.diff(date2, 'minute'); //计算相差的分钟数
  const diff2 = date3.diff(date2, 'minute'); //计算相差的分钟数

  console.log(begin, end, date1, date2, date3, diff1, diff2);
  if (!diff2) {
    return;
  }
  let percent = (diff1 / diff2).toFixed(2);
  return percent;
}

export function dateDuring(type) {
  let during = [0, 1, 2, 3, 4, 5, 6];
  let during_2 = [6, 5, 4, 3, 2, 1, 0];

  let data = [];

  let stragety = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
  };
  if (type === 'saicheng') {
    data = during.map(item => {
      let weekOrigin = '';
      let date = '';
      let week = '';
      let now = item ? null : moment();
      let origin = moment().add(item, 'days');
      weekOrigin = origin.day();
      week = stragety[weekOrigin];
      date = origin.format('MM-DD');

      return {week, date, origin: origin.format('YYYY-MM-DD'), now};
    });
  } else if (type === 'saiguo') {
    data = during_2.map(item => {
      let weekOrigin = '';
      let date = '';
      let week = '';
      let now = item ? null : moment();
      let origin = moment().subtract(item, 'days');
      weekOrigin = origin.day();
      date = origin.format('MM-DD');
      week = stragety[weekOrigin];

      return {week, date, origin: origin.format('YYYY-MM-DD'), now};
    });
  }

  return data;
}

export function isObjEqual(o1, o2) {
  var props1 = Object.getOwnPropertyNames(o1);
  var props2 = Object.getOwnPropertyNames(o2);
  if (props1.length !== props2.length) {
    return false;
  }
  for (var i = 0, max = props1.length; i < max; i++) {
    var propName = props1[i];
    if (o1[propName] !== o2[propName]) {
      return false;
    }
  }
  return true;
}

export function handleScore(score) {
  if (!score) {
    return {
      left: '无',
      right: '无',
      percent: 0,
    };
  }

  let left = score.split('-')[0];
  let right = score.split('-')[1];
  let percent = 0;
  if (left) {
    left = Number(left.replace('%', ''));
  }
  if (right) {
    right = Number(right.replace('%', ''));
  }
  if (left + right) {
    percent = right / (left + right);
  }

  return {
    left,
    right,

    percent: percent,
  };
}

export function getMeiqia() {
  MeiqiaShow({
    clientInfo: {},
  });
}

export async function tximSetup(userInfo) {
  try {
    const events = await tximBridge.initSDK(1400390688);
    console.log('events', events);
  } catch (e) {
    console.log('error', e);
  }
  let params = {
    userId: userInfo.id,
  };
  let res = await $api['common/txSign'](params);
  let sign = res.resultData;

  try {
    const login = await tximBridge.login(userInfo.id.toString(), sign);

    console.log('events', tximBridge, tximEmitter, login);
  } catch (e) {
    console.log('error', e);
  }
}
