export default [
  {
    name: 'news',
    method: 'POST',
    desc: '资讯列表',
    path: '/api/News/GetNewsList',

    headers: {
      'Content-Type': 'application/json',
    },
  },
  {
    name: 'txSign',
    method: 'GET',
    desc: '获得腾讯的签名',
    path: '/api/TencentIM/GetSign',
  },
  {
    name: 'txSendTextMessage',
    method: 'POST',
    desc: '发送消息',
    path: '/api/TencentIM/SendGroupMsgTxt',
  },
  {
    name: 'server',
    method: 'GET',
    desc: '基础配置',
    path: '/api/Config/GetServerList',
  },
];
