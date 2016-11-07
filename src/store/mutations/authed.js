import * as types from '../../constants/mutation-types';

export default {
  [types.RECEIVE_ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken;
  },

  [types.RECEIVE_AUTHED_USER] (state, user) {
    state.user = user;
  },

  [types.RECEIVE_LIKES] (state, likes) {
    // equal state.likes = Object.assign({}, state.likes, likes);
    state.likes = { ...state.likes, ...likes };
  },

  [types.RECEIVE_AUTHED_PLAYLISTS] (state, playlists) {
    state.playlists = [ ...state.playlists, ...playlists ];
  },
  
  [types.RECEIVE_AUTHED_FOLLOWINGS] (state, users) {
    state.followings = { ...state.followings, ...users };
  },

  [types.SET_LIKE] (state, { songId, liked }) {
    state.likes = { ...state.likes, [songId]: liked };
  },

  [types.SET_FOLLOWING] (state, { userId, following }) {
    state.followings = { ...state.followings, [userId]: following };
  },

  [types.RESET_AUTHED] (state, playlists) {
    state.accessToken = null;
    state.followings = {};
    state.likes = {};
    state.playlists = [];
    state.user = null;
  },
};
