// import {serviceModel} from '../model/service';
import {doAction} from './getData';
import {letterModel, sportInfoListModel} from '../model/info';
export const SPORT_LIST = 'SPORT_LIST';
export const SPORT_FILTER = 'SPORT_FILTER';
export const SPORT_FILTER_TWO = 'SPORT_FILTER_TWO';
export const SPORT_FILTER_THREE = 'SPORT_FILTER_THREE';
export const SPORT_DETAIL = 'SPORT_DETAIL';
export const SPORT_GUESS = 'SPORT_GUESS';
export const SPORT_INFO_LIST = 'SPORT_INFO_LIST';
export const SPORT_PANKOU = 'SPORT_PANKOU';
export const SPORT_PANKOU_ONE = 'SPORT_PANKOU_ONE';
export const SPORT_PANKOU_TWO = 'SPORT_PANKOU_TWO';
export const SPORT_PANKOU_THREE = 'SPORT_PANKOU_THREE';
export const SPORT_PANKOU_COMPANY = 'SPORT_PANKOU_COMPANY';
export const SPORT_PANKOU_COMPANY_ONE = 'SPORT_PANKOU_COMPANY_ONE';
export const SPORT_PANKOU_COMPANY_TWO = 'SPORT_PANKOU_COMPANY_TWO';
export const SPORT_PANKOU_COMPANY_THREE = 'SPORT_PANKOU_COMPANY_THREE';
export const SPORT_LIVE_TEXT = 'SPORT_LIVE_TEXT';

export const TICKET_LIST = 'TICKET_LIST';
export const TICKET_TAB = 'TICKET_TAB';
export const TICKET_CATEGORY_LIST = 'TICKET_CATEGORY_LIST';
export const TICKET_DETAIL = 'TICKET_DETAIL';
export const TICKET_RECOMMEND_LIST = 'TICKET_RECOMMEND_LIST';
export const TICKET_RECOMMEND_DETAIL = 'TICKET_RECOMMEND_DETAIL';
export const TICKET_RECOMMEND_RECORD = 'TICKET_RECOMMEND_RECORD';
export const TICKET_PLAY_METHOD = 'TICKET_PLAY_METHOD';
export const TICKET_HISTORY_LIST = 'TICKET_HISTORY_LIST';

export const HAPPY_NEWS_LIST = 'HAPPY_NEWS_LIST';
export const HAPPY_VIDEO_LIST = 'HAPPY_VIDEO_LIST';

export const ROOM = 'ROOM';

// export const getServiceData = params =>
//   doAction(params, 'service/list', 'SPORTS_LIST', 'serviceData', serviceModel);

export const getSportList = params =>
  doAction(params, 'info/sportList', 'SPORT_LIST', 'sportList', {key: 'list'});

export const getTicketList = params =>
  doAction(params, 'info/ticketList', 'TICKET_LIST', 'ticketList', {
    key: 'lottoList',
  });

export const getTicketTab = params =>
  doAction(params, 'info/ticketTypeList', 'TICKET_TAB', 'ticketTab', {
    key: 'lotteryTypeList',
  });

export const getTicketCategoryList = params =>
  doAction(
    params,
    'info/ticketCategoryList',
    'TICKET_CATEGORY_LIST',
    'ticketCategoryList',
    {key: 'lotteryCategoryList'},
  );

export const getTicketRecordList = params =>
  doAction(
    params,
    'info/ticketRecordList',
    'TICKET_RECORD_LIST',
    'ticketRecordList',
  );

export const getHappyNewsList = params =>
  doAction(params, 'home/news', 'HAPPY_NEWS_LIST', 'ticketNewsList', {
    key: 'newsList',
  });

export const getHappyVideoList = params =>
  doAction(params, 'home/video', 'HAPPY_VIDEO_LIST', 'ticketVideoList', {
    key: 'list',
  });

export const getSportFilter = params =>
  doAction(params, 'info/sportFilterList', 'SPORT_FILTER', 'sportFilter', {
    key: 'list',
    model: letterModel,
  });
export const getSportFilterTwo = params =>
  doAction(
    params,
    'info/sportFilterList',
    'SPORT_FILTER_TWO',
    'sportFilterTwo',
    {
      key: 'list',
      model: letterModel,
    },
  );
export const getSportFilterThree = params =>
  doAction(
    params,
    'info/sportFilterList',
    'SPORT_FILTER_THREE',
    'sportFilterThree',
    {
      key: 'list',
      model: letterModel,
    },
  );

export const commitSportFilter = params => {
  return dispatch => {
    return dispatch({
      type: SPORT_FILTER,
      payload: {sportFilter: params},
    });
  };
};
export const commitSportFilterTwo = params => {
  return dispatch => {
    return dispatch({
      type: SPORT_FILTER_TWO,
      payload: {sportFilterTwo: params},
    });
  };
};
export const commitSportFilterThree = params => {
  return dispatch => {
    return dispatch({
      type: SPORT_FILTER_THREE,
      payload: {sportFilterThree: params},
    });
  };
};

export const getSportDetail = params =>
  doAction(params, 'info/sportDetail', 'SPORT_DETAIL', 'sportDetail');

export const commitSportDetail = params => {
  return dispatch => {
    return dispatch({
      type: SPORT_DETAIL,
      payload: {sportDetail: params},
    });
  };
};

export const getSportGuess = params =>
  doAction(params, 'info/sportGuess', 'SPORT_GUESS', 'sportGuess');

export const getSportInfoList = params =>
  doAction(params, 'info/sportInfoList', 'SPORT_INFO_LIST', 'sportInfoList', {
    key: 'list',
    model: sportInfoListModel,
  });

export const getSportPankou = params =>
  doAction(params, 'info/pankou', 'SPORT_PANKOU', 'sportPankou', {
    key: 'list',
  });
export const getSportPankouOne = params =>
  doAction(params, 'info/pankouOne', 'SPORT_PANKOU_ONE', 'sportPankouOne', {
    key: 'list',
  });
export const getSportPankouTwo = params =>
  doAction(params, 'info/pankouTwo', 'SPORT_PANKOU_TWO', 'sportPankouTwo');
export const getSportPankouThree = params =>
  doAction(
    params,
    'info/pankouThree',
    'SPORT_PANKOU_THREE',
    'sportPankouThree',
    {
      key: 'list',
    },
  );
export const getSportPankouCompany = params =>
  doAction(
    params,
    'info/pankouCompany',
    'SPORT_PANKOU_COMPANY',
    'sportPankouCompany',
    {
      key: 'list',
    },
  );
export const getSportPankouCompanyOne = params =>
  doAction(
    params,
    'info/pankouCompanyOne',
    'SPORT_PANKOU_COMPANY_ONE',
    'sportPankouCompanyOne',
    {
      key: 'list',
    },
  );
export const getSportPankouCompanyTwo = params =>
  doAction(
    params,
    'info/pankouCompanyTwo',
    'SPORT_PANKOU_COMPANY_TWO',
    'sportPankouCompanyTwo',
    {
      key: 'list',
    },
  );
export const getSportPankouCompanyThree = params =>
  doAction(
    params,
    'info/pankouCompanyThree',
    'SPORT_PANKOU_COMPANY_THREE',
    'sportPankouCompanyThree',
    {
      key: 'list',
    },
  );
export const getSportLiveText = params =>
  doAction(params, 'info/sportLiveText', 'SPORT_LIVE_TEXT', 'sportLiveText', {
    key: 'list',
  });
// 彩票

export const getTicketDetail = params =>
  doAction(params, 'info/ticketDetail', 'TICKET_DETAIL', 'ticketDetail');

export const getTicketRecommendList = params =>
  doAction(
    params,
    'info/ticketRecommendList',
    'TICKET_RECOMMEND_LIST',
    'ticketRecommendList',
    {key: 'lotteryRecordList'},
  );
export const getTicketRecommendDetail = params =>
  doAction(
    params,
    'info/ticketRecommendDetail',
    'TICKET_RECOMMEND_DETAIL',
    'ticketRecommendDetail',
  );
export const getTicketRecommendRecord = params =>
  doAction(
    params,
    'info/ticketRecommendRecord',
    'TICKET_RECOMMEND_RECORD',
    'ticketRecommendRecord',
    {key: 'lotteryRecordTop100List'},
  );
export const getTicketPlayMethod = params =>
  doAction(
    params,
    'info/ticketPlayMethod',
    'TICKET_PLAY_METHOD',
    'ticketPlayMethod',
    {
      key: 'lotteryPlayMethodList',
    },
  );
export const getTicketHistoryList = params =>
  doAction(
    params,
    'info/ticketHistoryList',
    'TICKET_HISTORY_LIST',
    'ticketHistoryList',
    {key: 'lotteryList'},
  );

export const getRoom = params => doAction(params, 'info/room', 'ROOM', 'room');
