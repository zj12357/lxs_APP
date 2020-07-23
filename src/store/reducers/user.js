import * as user from '../actions/user';

const DEFAULT_STATE = {
  userInfo: {},
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case user.USER_INFO:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
