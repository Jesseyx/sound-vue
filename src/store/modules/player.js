import mutations from '../mutations/player';
import * as actions from '../actions/player';
import * as getters from '../getters/player';

const state = {
  currentSongIndex: null,
  currentTime: 0,
  isPlaying: false,
  selectedPlaylists: [],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
