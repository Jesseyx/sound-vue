import * as types from '../../constants/mutation-types';

export function playSong(context, { playlist, index }) {
  changeCurrentTime(context, 0);

  const { selectedPlaylists } = context.getters;
  const len = selectedPlaylists.length;

  if (len === 0 || selectedPlaylists[len - 1] !== playlist) {
    changeSelectedPlaylists(context, playlist);
  }

  changePlayingSong(context, index);
};

function changeCurrentTime({ commit }, time) {
  commit(types.CHANGE_CURRENT_TIME, time);
}

function changeSelectedPlaylists({ commit }, playlist) {
  commit(types.CHANGE_SELECTED_PLAYLISTS, playlist);
}

function changePlayingSong({ commit }, songIndex) {
  commit(types.CHANGE_PLAYING_SONG, songIndex);
}
