import * as types from '../constants/mutation-types';

export default {
  [types.RECEIVE_ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken;
  },

  [types.RECEIVE_AUTHED_USER] (state, user) {
    state.user = user;
  },
};
