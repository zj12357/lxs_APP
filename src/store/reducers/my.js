import * as my from '../actions/my';

const DEFAULT_STATE = {
  newsCollectList: [],
  sportCollectList: [],
  ticketCollectList: [],
  videoCollectList: [],
  sportAttentionList: [],
  ticketAttentionList: [],

  messageAll: [],
  messageRead: [],
  messageUnread: [],

  about: {},
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case my.NEWS_COLLECT_LIST:
      return {...state, ...action.payload};
    case my.SPORT_COLLECT_LIST:
      return {...state, ...action.payload};
    case my.TICKET_COLLECT_LIST:
      return {...state, ...action.payload};
    case my.VIDEO_COLLECT_LIST:
      return {...state, ...action.payload};
    case my.SPORT_ATTENTION_LIST:
      return {...state, ...action.payload};
    case my.TICKET_ATTENTION_LIST:
      return {...state, ...action.payload};
    case my.MESSAGE_ALL:
      return {...state, ...action.payload};
    case my.MESSAGE_READ:
      return {...state, ...action.payload};
    case my.MESSAGE_UNREAD:
      return {...state, ...action.payload};
    case my.ABOUT:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
