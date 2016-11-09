import * as types from '../../constants/mutation-types';
import { CHANGE_TYPES } from '../../constants/SongConstants';

export function playSong(context, { playlist, index }) {
  changeCurrentTime(context, 0);

  const { selectedPlaylists } = context.getters;
  const len = selectedPlaylists.length;

  if (len === 0 || selectedPlaylists[len - 1] !== playlist) {
    changeSelectedPlaylists(context, playlist);
  }

  changePlayingSong(context, index);
}

export function changeCurrentTime({ commit }, time) {
  commit(types.CHANGE_CURRENT_TIME, time);
}

function changeSelectedPlaylists({ commit }, playlist) {
  commit(types.CHANGE_SELECTED_PLAYLISTS, playlist);
}

export function changePlayingSong({ commit }, songIndex) {
  commit(types.CHANGE_PLAYING_SONG, songIndex);
}

export function toggleIsPlaying({ commit }, isPlaying) {
  commit(types.TOGGLE_IS_PLAYING, isPlaying);
}

export function changeSong(context, changeType) {
  const { currentSongIndex, selectedPlaylists, playlists } = context.getters;
  const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
  const currentPlaylistItems = playlists[currentPlaylist].items;
  let newSongIndex;

  if (changeType === CHANGE_TYPES.NEXT) {
    newSongIndex = currentSongIndex + 1;
  } else if (changeType === CHANGE_TYPES.PREV) {
    newSongIndex = currentSongIndex - 1;
  } else if (changeType === CHANGE_TYPES.SHUFFLE) {
    newSongIndex = Math.floor(((Math.random() * currentPlaylistItems.length) - 1) + 0);
  }

  if (newSongIndex >= currentPlaylistItems.length || newSongIndex < 0) {
    return;
  }

  changePlayingSong(context, newSongIndex);
}
