/** @format */

export default [
  /*  体育服务
   *
   */

  {
    name: 'sportInfoList',
    method: 'POST',
    desc: '情报列表',
    path: '/api/Sports/GetInformationList',
  },
  {
    name: 'sportFilterList',
    method: 'POST',
    desc: '联赛列表',
    path: '/api/Sports/GetLeagueList',
  },
  {
    name: 'pankou',
    method: 'POST',
    desc: '盘口数据',
    path: '/api/Sports/GetHandicaList',
  },
  {
    name: 'pankouOne',
    method: 'POST',
    desc: '盘口数据让球',
    path: '/api/Sports/GetAsiaHandicaList',
  },
  {
    name: 'pankouTwo',
    method: 'POST',
    desc: '盘口数据欧指',
    path: '/api/Sports/GetEuropeHandicaList',
  },
  {
    name: 'pankouThree',
    method: 'POST',
    desc: '盘口数据进球数',
    path: '/api/Sports/GetSizeHandicaList',
  },
  {
    name: 'pankouCompany',
    method: 'POST',
    desc: '指数盘口',
    path: '/api/Sports/GetCompanyHandicaList',
  },
  {
    name: 'pankouCompanyOne',
    method: 'POST',
    desc: '指数盘口让球',
    path: '/api/Sports/GetCompanyAsiaHandicaList',
  },
  {
    name: 'pankouCompanyTwo',
    method: 'POST',
    desc: '指数盘口',
    path: '/api/Sports/GetCompanyEuropeHandicaList',
  },
  {
    name: 'pankouCompanyThree',
    method: 'POST',
    desc: '指数盘口',
    path: '/api/Sports/GetCompanySizeHandicaList',
  },
  {
    name: 'sportDetail',
    method: 'POST',
    desc: '赛事详情',
    path: '/api/Sports/GetCompetitionDetail',
  },
  {
    name: 'sportList',
    method: 'POST',
    desc: '赛事列表',
    path: '/api/Sports/GetCompetitionList',
  },
  {
    name: 'sportRecommend',
    method: 'POST',
    desc: '推荐列表',
    path: '/api/Sports/GetReferralsList',
  },
  {
    name: 'sportScore',
    method: 'POST',
    desc: '昨日战绩',
    path: '/api/Sports/GetExploits',
  },
  {
    name: 'sportLiveText',
    method: 'POST',
    desc: '文字直播',
    path: '/api/Sports/GetLiveInformation',
  },
  {
    name: 'sportGuess',
    method: 'POST',
    desc: '预测信息',
    path: '/api/Sports/GetPredictionsInformation',
  },

  /*  彩票
   *
   */
  // 彩票分类列表
  {
    name: 'ticketScore',
    method: 'POST',
    desc: '彩票战绩',
    path: '/api/Lottery/GetLotteryExploits',
  },
  {
    name: 'ticketHot',
    method: 'POST',
    desc: '热门彩票',
    path: '/api/Lottery/HotLotteryList',
  },
  {
    name: 'ticketTypeList',
    method: 'POST',
    desc: '彩种分类列表',
    path: '/api/Lottery/LotteryTypeList',
  },
  // 彩种列表
  {
    name: 'ticketCategoryList',
    method: 'POST',
    desc: '彩种列表',
    path: '/api/Lottery/LotteryCategoryList',
  },
  {
    name: 'ticketList',
    method: 'POST',
    desc: '彩票列表',
    path: '/api/Lottery/LottoList',
  },
  // 计划列表
  {
    name: 'ticketHistoryList',
    method: 'POST',
    desc: '历史开奖列表',
    path: '/api/Lottery/LotteryList',
  },
  {
    name: 'ticketDetail',
    method: 'POST',
    desc: '开奖详情',
    path: '/api/Lottery/LotteryDetail',
  },
  // 开奖记录列表
  {
    name: 'ticketRecommendList',
    method: 'POST',
    desc: '专家推荐列表',
    path: '/api/Lottery/LotteryRecordList',
  },

  {
    name: 'ticketRecommendDetail',
    method: 'POST',
    desc: '推荐详情',
    path: '/api/Lottery/LotteryRecordDetail',
  },
  {
    name: 'ticketRecommendRecord',
    method: 'POST',
    desc: '100期推荐列表',
    path: '/api/Lottery/LotteryRecordTop100List',
  },
  {
    name: 'ticketPlayMethod',
    method: 'POST',
    desc: '玩法列表',
    path: '/api/Lottery/LotteryPlayMethodList',
  },

  /*  聊天室
   *
   */

  {
    name: 'room',
    method: 'GET',
    desc: '返回聊天室详细',
    path: '/api/ChatRoom/GetChatroomInfoById',
  },
  {
    name: 'roomSendText',
    method: 'GET',
    desc: '发送文字信息',
    path: '/api/ChatRoom/SendTxtMessage',
  },
];
