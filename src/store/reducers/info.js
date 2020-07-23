import * as info from '../actions/info';

const DEFAULT_STATE = {
  sportList: [],
  sportFilter: [],
  sportFilterTwo: [],
  sportFilterThree: [],
  sportDetail: {},
  sportGuess: {},
  sportInfoList: [],
  sportPankou: [],
  sportPankouOne: [],
  sportPankouTwo: {},

  sportPankouThree: [],
  sportPankouCompany: [],
  sportPankouCompanyOne: [],
  sportPankouCompanyTwo: [],
  sportPankouCompanyThree: [],
  sportLiveText: [],

  ticketList: [],
  ticketTab: [],
  ticketCategoryList: [],
  ticketRecordList: [],
  ticketDetail: {},
  ticketRecommendList: [],
  ticketRecommendDetail: {},
  ticketRecommendRecord: [],
  ticketPlayMethod: [],
  ticketHistoryList: [],

  happyNewsList: [],
  happyVideoList: [],

  room: {},
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case info.SPORT_LIST:
      return {...state, ...action.payload};
    case info.SPORT_FILTER:
      return {...state, ...action.payload};
    case info.SPORT_FILTER_TWO:
      return {...state, ...action.payload};
    case info.SPORT_FILTER_THREE:
      return {...state, ...action.payload};
    case info.SPORT_DETAIL:
      return {...state, ...action.payload};
    case info.SPORT_GUESS:
      return {...state, ...action.payload};
    case info.SPORT_INFO_LIST:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU_ONE:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU_TWO:
      return {...state, ...action.payload};

    case info.SPORT_PANKOU_THREE:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU_COMPANY:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU_COMPANY_ONE:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU_COMPANY_TWO:
      return {...state, ...action.payload};
    case info.SPORT_PANKOU_COMPANY_THREE:
      return {...state, ...action.payload};
    case info.SPORT_LIVE_TEXT:
      return {...state, ...action.payload};

    case info.TICKET_LIST:
      return {...state, ...action.payload};
    case info.TICKET_TAB:
      return {...state, ...action.payload};
    case info.TICKET_CATEGORY_LIST:
      return {...state, ...action.payload};
    case info.TICKET_RECORD_LIST:
      return {...state, ...action.payload};
    case info.TICKET_DETAIL:
      return {...state, ...action.payload};
    case info.TICKET_RECOMMEND_LIST:
      return {...state, ...action.payload};
    case info.TICKET_RECOMMEND_DETAIL:
      return {...state, ...action.payload};
    case info.TICKET_RECOMMEND_RECORD:
      return {...state, ...action.payload};
    case info.TICKET_PLAY_METHOD:
      return {...state, ...action.payload};
    case info.TICKET_HISTORY_LIST:
      return {...state, ...action.payload};

    case info.HAPPY_NEWS_LIST:
      return {...state, ...action.payload};
    case info.HAPPY_VIDEO_LIST:
      return {...state, ...action.payload};

    case info.ROOM:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
