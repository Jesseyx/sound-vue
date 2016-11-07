import Vue from 'vue';
import Vuex from 'vuex';

import authed from './modules/authed';
import playlists from './modules/playlists';
import entities from './modules/entities';
import player from './modules/player';
import environment from './modules/environment';

import * as songsAction from './actions/songs';

import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  // resolve other actions
  actions: { ...songsAction },
  modules: {
    authed,
    playlists,
    entities,
    player,
    environment,
  },
  plugins,
  strict: process.env.NODE_ENV !== 'production',
});
