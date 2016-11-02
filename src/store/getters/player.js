import { getPlayingSongId } from '../../utils/PlayerUtils';

export const currentTime = (state) => {
  return state.currentTime;
};

export const playingSongId = (state, getters) => {
  return getPlayingSongId(state, getters.playlists);
};

export const selectedPlaylists = (state) => {
  return state.selectedPlaylists;
};

export const isPlaying = (state) => {
  return state.isPlaying;
};

export const currentSongIndex = (state) => {
  return state.currentSongIndex;
};

export const player = (state) => {
  return state;
};
