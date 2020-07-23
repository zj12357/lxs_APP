import {doAction} from './getData';

export const HOME_SWIPER = 'HOME_SWIPER';
export const HOME_NOTICE = 'HOME_NOTICE';
export const HOME_NEWS = 'HOME_NEWS';
export const HOME_RECORD_SPORT = 'HOME_RECORD_SPORT';
export const HOME_RECORD_TICKET = 'HOME_RECORD_TICKET';
export const HOME_SPORTS = 'HOME_SPORTS';
export const HOME_TICKET = 'HOME_TICKET';

export const NEWS_DETAIL = 'NEWS_DETAIL';
export const NEWS_COMMENT_LIST = 'NEWS_COMMENT_LIST';

export const HOME_VIDEO = 'HOME_VIDEO';
export const VIDEO_DETAIL = 'VIDEO_DETAIL';
export const VIDEO_COMMENT_LIST = 'VIDEO_COMMENT_LIST';

export const getHomeSwiper = params =>
  doAction(params, 'home/swiper', 'HOME_SWIPER', 'homeSwiper');

export const getHomeNotice = params =>
  doAction(params, 'home/notice', 'HOME_NOTICE', 'homeNotice');

export const getHomeNews = params =>
  doAction(params, 'home/news', 'HOME_NEWS', 'homeNews', {key: 'newsList'});

export const getHomeRecordSport = params =>
  doAction(params, 'info/sportScore', 'HOME_RECORD_SPORT', 'homeRecordSport');

export const getHomeRecordTicket = params =>
  doAction(
    params,
    'info/ticketScore',
    'HOME_RECORD_TICKET',
    'homeRecordTicket',
  );

export const getHomeSports = params =>
  doAction(params, 'info/sportRecommend', 'HOME_SPORTS', 'homeSports', {
    key: 'list',
  });

export const commitHomeSports = params => {
  return dispatch => {
    return dispatch({
      type: HOME_SPORTS,
      payload: {homeSports: params},
    });
  };
};

export const getHomeTicket = params =>
  doAction(params, 'info/ticketHot', 'HOME_TICKET', 'homeTicket', {
    key: 'hotLotteryList',
  });

export const getNewsDetail = params =>
  doAction(params, 'home/newsDetail', 'NEWS_DETAIL', 'newsDetail');

export const getNewsCommentList = params =>
  doAction(params, 'home/commentList', 'NEWS_COMMENT_LIST', 'newsCommentList', {
    key: 'nMCommentInfoLists',
  });

export const getHomeVideo = params =>
  doAction(params, 'home/video', 'HOME_VIDEO', 'homeVideo', {key: 'list'});

export const getVideoDetail = params =>
  doAction(params, 'home/videoDetail', 'VIDEO_DETAIL', 'videoDetail');

export const getVideoCommentList = params =>
  doAction(
    params,
    'home/videoComment',
    'VIDEO_COMMENT_LIST',
    'videoCommentList',
    {
      key: 'list',
    },
  );
