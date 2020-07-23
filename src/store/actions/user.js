import {doAction} from './getData';
import $api from '@/config/api';
export const USER_INFO = 'USER_INFO';
import {modal} from '@/utils';
// import JMessage from 'jmessage-react-plugin';

export const getUserInfo = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let token = getState().persist.token;
      $api['user/userInfo'](null, {headers: {Authorization: token}})
        .then(res => {
          let resData = res.resultData;
          if (!resData) {
            modal.showToast('请求成功，但接口没有返回用户信息');
            return;
          }
          let newRes = resData;

          // JMessage.login(
          //   {
          //     username: newRes.name,
          //     password: 'Wangkui3',
          //   },
          //   e => {
          //     console.log(e, 'messageLogin');
          //   },
          //   error => {
          //     console.log(error, 'messageLoginFail');
          //   },
          // );

          let reducer = {
            type: 'USER_INFO',
            payload: {
              userInfo: newRes,
            },
          };

          dispatch(reducer);
          resolve(newRes);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const commitUserInfo = params => {
  return dispatch => {
    return dispatch({
      type: USER_INFO,
      payload: {userInfo: params},
    });
  };
};
