/** @format */

export default [
  {
    name: 'login',
    method: 'POST',
    desc: '登陆',
    path: '/api/Account/Login',
  },
  {
    name: 'login2',
    method: 'POST',
    desc: '验证码登陆',
    path: '/api/Account/VerificationLogin',
  },
  {
    name: 'userInfo',
    method: 'POST',
    desc: '用户信息',
    path: '/api/Account/GetUserInfoByUserId',
  },

  {
    name: 'loginOut',
    method: 'POST',
    desc: '登出',
    path: '/api/Account/Logout',
  },
  {
    name: 'register',
    method: 'POST',
    desc: '注册',
    path: '/api/Account/Register',
  },
  {
    name: 'updatePwd',
    method: 'POST',
    desc: '更新密码',
    path: '/api/Account/ModifyPassWord',
  },
  {
    name: 'updatePwd2',
    method: 'POST',
    desc: '更新密码2',
    path: '/api/Account/ModifyPassWord2',
  },
  {
    name: 'findPwd',
    method: 'POST',
    desc: '找回密码 下一步',
    path: '/api/Account/ForgetPassWordStepNext',
  },
  {
    name: 'getCode',
    method: 'POST',
    desc: '发送验证码短信',
    path: '/api/Account/ForgetPassWord',
  },

  {
    name: 'link',
    method: 'POST',
    desc: '绑定第三方账号',
    path: '/api/Account/BindPartyUser',
  },
  {
    name: 'updateInfo',
    method: 'POST',
    desc: '修改用户信息',
    path: '/api/Account/ModifyCMUserInfo',
  },
  {
    name: 'uploadImg',
    method: 'POST',
    desc: '上传头像',
    path: '/api/Common/AppUploadHeadImg',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
];
