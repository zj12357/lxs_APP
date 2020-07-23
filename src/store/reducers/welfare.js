import * as welfare from '../actions/welfare';

const DEFAULT_STATE = {
  welfareType: [],
  welfareCategoryList: [],
  welfareDetail: {},
  welfareApplyList: [],
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case welfare.WELFARE_TYPE:
      return {...state, ...action.payload};
    case welfare.WELFARE_CATEGORY_LIST:
      return {...state, ...action.payload};
    case welfare.WELFARE_DETAIL:
      return {...state, ...action.payload};
    case welfare.WELFARE_APPLY_LIST:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
