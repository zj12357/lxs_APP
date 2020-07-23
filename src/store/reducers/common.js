import * as common from '../actions/common';

const DEFAULT_STATE = {
  notice: [],
  initServer: [],
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case common.NOTICE:
      return {...state, ...action.payload};
    case common.INIT_SERVER:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
