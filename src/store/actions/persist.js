export const TOKEN = 'TOKEN';

export const commitToken = params => {
  return dispatch => {
    return dispatch({
      type: TOKEN,
      payload: {token: params},
    });
  };
};
