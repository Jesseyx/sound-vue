import Vue from 'vue';
import Vuex from 'vuex';

import authed from './modules/authed';
import playlists from './modules/playlists';
import entities from './modules/entities';

import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authed,
    playlists,
    entities,
  },
  plugins,
});
