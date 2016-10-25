import Vue from 'vue';
import * as types from '../constants/mutation-types';

const initialPlaylistState = {
  isFetching: false,
  items: [],
  nextUrl: null,
  futureUrl: null,
};

export default {
  [types.REQUEST_SONGS] (state, playlist) {
    if (!state[playlist]) {
      const obj = Object.assign({}, initialPlaylistState, {
        isFetching: true,
        nextUrl: null,
      });

      // add new reactivity object
      Vue.set(state, playlist, obj);
    } else {
      state[playlist].isFetching = true;
      state[playlist].nextUrl = null;
    }
  },
};
