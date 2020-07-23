import {doAction} from './getData';

export const WELFARE_TYPE = 'WELFARE_TYPE';
export const WELFARE_CATEGORY_LIST = 'WELFARE_CATEGORY_LIST';
export const WELFARE_DETAIL = 'WELFARE_DETAIL';
export const WELFARE_APPLY_LIST = 'WELFARE_APPLY_LIST';

export const getWelfareType = params =>
  doAction(params, 'welfare/type', 'WELFARE_TYPE', 'welfareType', {
    key: 'list',
  });

export const getWelfareCategoryList = params =>
  doAction(
    params,
    'welfare/list',
    'WELFARE_CATEGORY_LIST',
    'welfareCategoryList',
    {
      key: 'list',
    },
  );

export const getWelfareDetail = params =>
  doAction(params, 'welfare/detail', 'WELFARE_DETAIL', 'welfareDetail');

export const getWelfareApplyList = params =>
  doAction(
    params,
    'welfare/applyList',
    'WELFARE_APPLY_LIST',
    'welfareApplyList',
    {
      key: 'list',
    },
  );
