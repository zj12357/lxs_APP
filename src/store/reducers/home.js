import * as home from '../actions/home';

const DEFAULT_STATE = {
  homeSwiper: [],
  homeNotice: [],
  homeNews: [],
  homeRecordSport: {},
  homeRecordTicket: {},
  homeSports: [],
  homeTicket: [],
  newsDetail: [],
  newsCommentList: [],
  homeVideo: [],
  videoDetail: {},
  videoCommentList: [],
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case home.HOME_SWIPER:
      return {...state, ...action.payload};
    case home.HOME_NOTICE:
      return {...state, ...action.payload};
    case home.HOME_NEWS:
      return {...state, ...action.payload};
    case home.HOME_RECORD_SPORT:
      return {...state, ...action.payload};
    case home.HOME_RECORD_TICKET:
      return {...state, ...action.payload};
    case home.HOME_SPORTS:
      return {...state, ...action.payload};
    case home.HOME_TICKET:
      return {...state, ...action.payload};
    case home.NEWS_DETAIL:
      return {...state, ...action.payload};
    case home.NEWS_COMMENT_LIST:
      return {...state, ...action.payload};
    case home.HOME_VIDEO:
      return {...state, ...action.payload};
    case home.VIDEO_DETAIL:
      return {...state, ...action.payload};
    case home.VIDEO_COMMENT_LIST:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
