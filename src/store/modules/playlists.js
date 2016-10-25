import mutations from '../mutations/playlists';
import * as actions from '../actions/playlists';
import * as getters from '../getters/playlists';

import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

const LIKES_PLAYLIST_KEY = `likes${AUTHED_PLAYLIST_SUFFIX}`;
const STREAM_PLAYLIST_KEY = `stream${AUTHED_PLAYLIST_SUFFIX}`;

const state = {
  [LIKES_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null },
  [STREAM_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
