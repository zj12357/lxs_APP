import $api from '@/config/api';
import {modal} from '@/utils';

export function doAction(params, url, dispatchType, stateData, other = {}) {
  console.log('e', params, url, dispatchType, stateData, other);
  return dispatch => {
    return new Promise((resolve, reject) => {
      $api[url](params, other.replaceUrl)
        .then(res => {
          let resData = res.resultData;
          if (!res.resultData) {
            modal.showToast(res.message || res.Message);
            resolve(res.resultData);
            return;
          }
          if (other.key) {
            resData = res.resultData[other.key];
          }

          let newRes;
          if (other.model) {
            newRes = other.model(resData);
          } else {
            newRes = resData;
          }
          let reducer = {
            type: '',
            payload: {},
          };
          reducer.type = dispatchType;

          reducer.payload[stateData] = newRes;
          console.log(reducer, 'reducer');
          dispatch(reducer);
          resolve(newRes);
        })
        .catch(err => {
          modal.shotToast('请求失败');
          reject(err);
        });
    });
  };
}
