import Vue from 'vue';
import Vuex from 'vuex';

import authed from './modules/authed';
import playlists from './modules/playlists';

import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authed,
    playlists,
  },
  plugins,
});
