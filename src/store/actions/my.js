import {doAction} from './getData';

export const NEWS_COLLECT_LIST = 'NEWS_COLLECT_LIST';
export const SPORT_COLLECT_LIST = 'SPORT_COLLECT_LIST';
export const VIDEO_COLLECT_LIST = 'VIDEO_COLLECT_LIST';

export const SPORT_ATTENTION_LIST = 'SPORT_ATTENTION_LIST';
export const TICKET_ATTENTION_LIST = 'TICKET_ATTENTION_LIST';

export const MESSAGE_ALL = 'MESSAGE_ALL';
export const MESSAGE_READ = 'MESSAGE_READ';
export const MESSAGE_UNREAD = 'MESSAGE_UNREAD';
export const ABOUT = 'ABOUT';

export const getNewsCollectList = params =>
  doAction(
    params,
    'my/newsCollectList',
    'NEWS_COLLECT_LIST',
    'newsCollectList',
    {
      key: 'interestedRecordList',
    },
  );

export const getSportCollectList = params =>
  doAction(
    params,
    'my/sportCollectList',
    'SPORT_COLLECT_LIST',
    'sportCollectList',
    {
      key: 'interestedRecordsSportList',
    },
  );

export const getVideoCollectList = params =>
  doAction(
    params,
    'my/videoCollectList',
    'VIDEO_COLLECT_LIST',
    'videoCollectList',
    {
      key: 'interestedRecordsVideoLists',
    },
  );

export const getSportAttentionList = params =>
  doAction(
    params,
    'my/sportAttentionList',
    'SPORT_ATTENTION_LIST',
    'sportAttentionList',
    {
      key: 'attentionRecordsList',
    },
  );

export const getTicketAttentionList = params =>
  doAction(
    params,
    'my/ticketAttentionList',
    'TICKET_ATTENTION_LIST',
    'ticketAttentionList',
    {
      key: 'attentionRecordsList',
    },
  );
export const getMessageAll = params =>
  doAction(params, 'my/message', 'MESSAGE_ALL', 'messageAll', {
    key: 'cmUserMessageList',
  });
export const getMessageRead = params =>
  doAction(params, 'my/message', 'MESSAGE_READ', 'messageRead', {
    key: 'cmUserMessageList',
  });
export const getMessageUnread = params =>
  doAction(params, 'my/message', 'MESSAGE_UNREAD', 'messageUnread', {
    key: 'cmUserMessageList',
  });
export const getAbout = params =>
  doAction(params, 'my/about', 'ABOUT', 'about');
