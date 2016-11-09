import { getPlayingSongId } from '../../utils/PlayerUtils';

export const currentTime = state => state.currentTime;

export const playingSongId = (state, getters) => getPlayingSongId(state, getters.playlists);

export const selectedPlaylists = state => state.selectedPlaylists;

export const isPlaying = state => state.isPlaying;

export const currentSongIndex = state => state.currentSongIndex;

export const player = state => state;
