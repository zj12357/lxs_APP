/** @format */

export default [
  {
    name: 'addCollect',
    method: 'POST',
    desc: '添加收藏',
    path: '/api/UserIntersted/AddInterestedRecords',
  },
  {
    name: 'addAttention',
    method: 'POST',
    desc: '添加关注',
    path: '/api/UserIntersted/AddAttentionRecords',
  },
  {
    name: 'delAttention',
    method: 'POST',
    desc: '删除关注',
    path: '/api/UserIntersted/DeleteAttentionRecords2',
  },
  {
    name: 'delMyAttention',
    method: 'POST',
    desc: '删除关注',
    path: '/api/UserIntersted/DeleteAttentionRecords',
  },
  {
    name: 'delCollect',
    method: 'POST',
    desc: '删除收藏',
    path: '/api/UserIntersted/DeleteInterestedRecords2',
  },
  {
    name: 'delMyCollect',
    method: 'POST',
    desc: '删除收藏',
    path: '/api/UserIntersted/DeleteInterestedRecords',
  },
  {
    name: 'newsCollectList',
    method: 'POST',
    desc: '资讯收藏列表',
    path: '/api/UserIntersted/GetInterestedRecordsList',
  },
  {
    name: 'videoCollectList',
    method: 'POST',
    desc: '视频收藏列表',
    path: '/api/UserIntersted/GetInterestedRecordsVideoList',
  },
  {
    name: 'sportCollectList',
    method: 'POST',
    desc: '体育收藏列表',
    path: '/api/UserIntersted/GetInterestedRecordsSportList',
  },
  {
    name: 'ticketCollectList',
    method: 'POST',
    desc: '彩票收藏列表',
    path: '/api/UserIntersted/GetInterestedRecordsLotteryList',
  },
  {
    name: 'ticketAttentionList',
    method: 'POST',
    desc: '彩票关注列表',
    path: '/api/UserIntersted/GetAttentionRecordsByLotteryList',
  },
  {
    name: 'sportAttentionList',
    method: 'POST',
    desc: '体育关注列表',
    path: '/api/UserIntersted/GetAttentionRecordsBySportList',
  },

  /**
   * 我的消息
   */
  {
    name: 'message',
    method: 'POST',
    desc: '体育关注列表',
    path: '/api/UserInfo/GetUserMessageList',
  },

  /**
   * 关于我们
   */
  {
    name: 'about',
    method: 'POST',
    desc: '关于',
    path: '/api/SysService/DetailSYSAboutUsByPlatformId',
  },
  /**
   *  反馈
   */
  {
    name: 'feedback',
    method: 'POST',
    desc: '反馈',
    path: '/api/UserInfo/AddCMFeedback',
  },
  /**
   *  关联三方
   */
  {
    name: 'link',
    method: 'POST',
    desc: '关联三方',
    path: '/api/Account/BindPartyUser',
  },
];
