import {doAction} from './getData';
export const NOTICE = 'NOTICE';
export const INIT_SERVER = 'INIT_SERVER';

export const getNotice = params =>
  doAction(params, 'common/notice', 'NOTICE', 'notice');

export const getInitServer = params =>
  doAction(params, 'common/server', 'INIT_SERVER', 'initServer', {key: 'list'});
