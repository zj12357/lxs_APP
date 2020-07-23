import * as search from '../actions/persist';

const DEFAULT_STATE = {
  token: '',
  userId: '',
};

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case search.TOKEN:
      return {...state, ...action.payload};
    case search.USER_ID:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
