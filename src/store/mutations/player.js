import * as types from '../../constants/mutation-types';

export default {
  [types.CHANGE_CURRENT_TIME](state, time) {
    state.currentTime = time;
  },

  [types.CHANGE_SELECTED_PLAYLISTS](state, playlist) {
    const { selectedPlaylists } = state;

    const index = selectedPlaylists.indexOf(playlist);

    if (index > -1) {
      selectedPlaylists.splice(index, 1);
    }

    selectedPlaylists.push(playlist);
  },

  [types.CHANGE_PLAYING_SONG](state, songIndex) {
    state.currentSongIndex = songIndex;
  },

  [types.TOGGLE_IS_PLAYING](state, isPlaying) {
    state.isPlaying = isPlaying;
  },
};
