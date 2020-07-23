/** @format */

export default [
  {
    name: 'swiper',
    method: 'POST',
    desc: '首页轮播图',
    path: '/api/SysService/GetBannerList',
  },
  {
    name: 'notice',
    method: 'POST',
    desc: '公告列表',
    path: '/api/SysService/GetNoticeList',
  },

  /*  资讯
   *
   */
  {
    name: 'news',
    method: 'POST',
    desc: '资讯列表',
    path: '/api/News/GetNewsList',
  },
  {
    name: 'newsDetail',
    method: 'POST',
    desc: '单条资讯',
    path: '/api/News/GetNewsById',
  },
  {
    name: 'newsCommentCount',
    method: 'POST',
    desc: '更新评论量',
    path: '/api/News/UpdateNewsCommentNumber',
  },
  {
    name: 'newsViewCount',
    method: 'POST',
    desc: '更新浏览量',
    path: '/api/News/UpdateNewsByBrowseNumber',
  },
  {
    name: 'commentList',
    method: 'POST',
    desc: '评论列表',
    path: '/api/News/GetCommentInfoList',
  },
  {
    name: 'addComment',
    method: 'POST',
    desc: '添加评论',
    path: '/api/News/AddCommentInfo',
  },
  /*  视频
   *
   */
  {
    name: 'videoType',
    method: 'POST',
    desc: '视频类型列表',
    path: '/api/Video/VideoTypeList',
  },
  {
    name: 'video',
    method: 'POST',
    desc: '视频列表',
    path: '/api/Video/VideoList',
  },
  {
    name: 'videoDetail',
    method: 'POST',
    desc: '视频详情',
    path: '/api/Video/VideoDetail',
  },
  {
    name: 'addVideoComment',
    method: 'POST',
    desc: '添加视频评论',
    path: '/api/Video/AddVideoComment',
  },
  {
    name: 'videoComment',
    method: 'POST',
    desc: '视频评论',
    path: '/api/Video/VideoCommentList',
  },
];
