/** @format */

import axios from './axios';
import Qs from 'qs';
import _pick from 'lodash/pick';
import _assign from 'lodash/assign';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';

// import {assert} from '@/utils';
import {API_DEFAULT_CONFIG, AXIOS_DEFAULT_CONFIG} from '@/config';
import API_CONFIG from '@/api';

/**
 * 生成api接口类
 */
class Api {
  constructor(options) {
    this.api = {};
    this.apiBuilder(options);
  }

  /**
   * 创建工程接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  apiBuilder({
    sep = '/',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace],
      });
    });
  }

  /**
   * 创建单个接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  _apiSingleBuilder({
    namespace,
    sep = '/',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
  }) {
    config.forEach(api => {
      const {name, desc, params, method, path, cache = true, headers} = api;
      let apiname = `${namespace}${sep}${name}`; // 接口调用名称 this.$api['apiname']()

      const baseURL = mock ? mockBaseURL : AXIOS_DEFAULT_CONFIG.baseURL; // 接口base地址
      let url = baseURL + path; // 接口地址
      // debug && assert(name, `${url} :接口name属性不能为空`);
      // debug &&
      //   assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`);
      Object.defineProperty(this.api, `${apiname}`, {
        value(outerParams, outerOptions) {
          // let _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params));
          let _data =
            _isArray(outerParams) || outerParams instanceof FormData
              ? outerParams
              : _merge({}, params, outerParams);

          let newConfig = {
            name,
            url,
            desc,
            baseURL,
            method,

            cache,
          };
          if (headers) {
            newConfig.headers = headers;
          }
          return axios(_normoalize(_assign(newConfig, outerOptions), _data));
        },
      });
    });
  }
}

/**
 * 根据请求类型处理axios参数
 * @param options
 * @param data
 * @returns {*}
 * @private
 */
function _normoalize(options, data) {
  //处理IE下请求缓存
  if (!options.cache) {
    options.url = `${options.url}${
      options.url.includes('?') ? '&' : '?'
    }_=${new Date().getTime()}`;
  }

  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'DELETE'
  ) {
    options.data = data;
  } else if (options.method === 'GET') {
    options.params = data;
  }
  return options;
}

/**
 * 导出接口
 */
export default new Api({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG,
}).api;
