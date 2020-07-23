export * from './common';
import * as commonStyle from './variable';
import modal from './modal';
import ymodal from './ymodal';

import regex from './regex';
import $api from '@/config/api';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export {commonStyle, regex, modal, ymodal, $api, moment};
