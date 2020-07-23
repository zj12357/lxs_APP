/** @format */

export default {
  account: /^\w{6,14}$/i, //用户名
  pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, //密码。数字、字母的6-16位字符（不允许纯数字或纯字母）
  // pwd: /^[0-9A-Za-z]{6,16}$/, //密码。数字、字母的6-16位字符
  loginPwd: /^[\d\D]{6,16}$/, //匹配所有6-16位字符
  invitation: /^\d{6}$/, //匹配六位数字
  tel: /^1[3-9]\d{9}$/, //手机号
  email: /^[A-Za-z0-9]+([_\-\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/i, //邮箱
  // email: /^[a-zA-Z0-9_.-]+@[0-9a-z\-]{2,}(\.[a-z]{2,}){1,2}$/i //邮箱
};
