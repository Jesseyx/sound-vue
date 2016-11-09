import Vue from 'vue';
import merge from 'lodash/merge';
import * as types from '../../constants/mutation-types';
import { AUTHED_PLAYLIST_SUFFIX } from '../../constants/PlaylistConstants';

const initialPlaylistState = {
  isFetching: false,
  items: [],
  nextUrl: null,
  futureUrl: null,
};

const LIKES_PLAYLIST_KEY = `likes${AUTHED_PLAYLIST_SUFFIX}`;
const STREAM_PLAYLIST_KEY = `stream${AUTHED_PLAYLIST_SUFFIX}`;

export default {
  [types.REQUEST_SONGS](state, playlist) {
    if (!state[playlist]) {
      const obj = Object.assign({}, initialPlaylistState, {
        isFetching: true,
        nextUrl: null,
      });

      // add new reactivity object
      Vue.set(state, playlist, obj);
    } else {
      // You need to detect the entire list of data changes, so don't set every, set integral.
      // Equal: Object.assign(state[playlist], { isFetching: true, nextUrl: null });
      state[playlist] = { ...state[playlist], isFetching: true, nextUrl: null };
    }
  },

  [types.RECEIVE_SONGS](state, { songs, playlist, nextUrl, futureUrl }) {
    if (!state[playlist]) {
      const obj = Object.assign({}, initialPlaylistState, {
        isFetching: false,
        items: songs,
        nextUrl,
        futureUrl,
      });

      // add new reactivity object
      Vue.set(state, playlist, obj);
    } else {
      // see above
      const currentList = state[playlist];
      state[playlist] =
      {
        ...currentList,
        isFetching: false,
        items: [...currentList.items, ...songs],
        nextUrl,
        futureUrl,
      };
    }
  },

  [types.APPEND_LIKE](state, songId) {
    const currentList = state[LIKES_PLAYLIST_KEY];
    state[LIKES_PLAYLIST_KEY] = { ...currentList, items: [...currentList, songId] };
  },

  [types.RESET_AUTHED](state, playlists) {
    const resetedPlaylists = [...playlists, STREAM_PLAYLIST_KEY, LIKES_PLAYLIST_KEY];
    const newState = resetedPlaylists
      .reduce((obj, p) => merge({}, obj, { [p]: initialPlaylistState }), {});

    /* eslint-disable no-param-reassign */
    state = { ...state, ...newState };
  },
};
