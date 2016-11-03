import mutations from '../mutations/entities';
import * as actions from '../actions/entities';
import * as getters from '../getters/entities';

const state = {
  songs: {},
  users: {},
  // authedPlaylists
  playlists: {},
};

export default {
  state,
  mutations,
  actions,
  getters,
};
