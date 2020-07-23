/** @format */

export default [
  {
    name: 'list',
    method: 'POST',
    desc: '活动列表',
    path: '/api/Promotion/PromotionList',
  },
  {
    name: 'type',
    method: 'POST',
    desc: '活动分类',
    path: '/api/Promotion/PromotionTypeList',
  },
  {
    name: 'detail',
    method: 'POST',
    desc: '活动详情',
    path: '/api/Promotion/PromotionDetail',
  },
  {
    name: 'apply',
    method: 'POST',
    desc: '申请参加活动',
    path: '/api/Promotion/ApplyForPromotion',
  },
  {
    name: 'applyList',
    method: 'POST',
    desc: '申请记录',
    path: '/api/Promotion/ApplyRecordList',
  },
];
