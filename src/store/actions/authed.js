import SC from 'soundcloud';
import Cookies from 'js-cookie';
import { normalize, arrayOf } from 'normalizr';

import { CLIENT_ID } from '../../constants/Config';
import { SC_API_URL } from '../../constants/Api';
import * as types from '../../constants/mutation-types';
import { fetchSongs, requestSongs, receiveSongs } from './playlists';
import { AUTHED_PLAYLIST_SUFFIX } from '../../constants/PlaylistConstants';
import { songSchema, playlistSchema, userSchema } from '../../constants/Schemes';
import { changePlayingSong } from './player';
import { receiveEntities } from './entities';
import router from '../../router';

const COOKIE_PATH = 'accessToken';

export function initAuth(context) {
  const accessToken = Cookies.get(COOKIE_PATH);
  if (accessToken) {
    authUser(context, accessToken, false);
  }
}

function authUser(context, accessToken, shouldShowStream = true) {
  return fetchAuthedUser(context, accessToken, shouldShowStream);
}

function fetchAuthedUser(context, accessToken, shouldShowStream) {
  return fetch(`${SC_API_URL}/me?oauth_token=${accessToken}`)
    .then(response => response.json())
    .then(json => receiveAuthedUserPre(context, accessToken, json, shouldShowStream))
    .catch((err) => { throw err; });
}

function receiveAuthedUserPre(context, accessToken, user, shouldShowStream) {
  context.commit(types.RECEIVE_ACCESS_TOKEN, accessToken);
  context.commit(types.RECEIVE_AUTHED_USER, user);

  // Access to user streaming media and other data
  fetchStream(context, accessToken);
  fetchLikes(context, accessToken);
  fetchPlaylists(context, accessToken);
  fetchFollowings(context, accessToken);

  if (shouldShowStream) {
    router.push({ name: 'stream' });
  }
}

function fetchStream(context, accessToken) {
  // initInterval(accessToken);
  fetchSongs(context, {
    url: `${SC_API_URL}/me/activities/tracks/affiliated?limit=50&oauth_token=${accessToken}`,
    playlist: `stream${AUTHED_PLAYLIST_SUFFIX}`,
  });
}

function fetchLikes(context, accessToken) {
  const playlist = `likes${AUTHED_PLAYLIST_SUFFIX}`;
  requestSongs(context, playlist);

  fetch(`${SC_API_URL}/me/favorites?oauth_token=${accessToken}`)
    .then(response => response.json())
    .then((json) => {
      const songs = json.filter(song => song.streamable);
      const normalized = normalize(songs, arrayOf(songSchema));
      const likes = normalized.result
        .reduce((obj, songId) => Object.assign({}, obj, { [songId]: 1 }), {});

      receiveLikes(context, likes);
      receiveEntities(context, normalized.entities);
      receiveSongs(context, normalized.result, playlist, null);
    });
}

function receiveLikes({ commit }, likes) {
  commit(types.RECEIVE_LIKES, likes);
}

function fetchPlaylists(context, accessToken) {
  fetch(`${SC_API_URL}/me/playlists?oauth_token=${accessToken}`)
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      const normalized = normalize(json, arrayOf(playlistSchema));
      console.log(normalized);
      receiveAuthedPlaylists(context, normalized.result);
      receiveEntities(context, normalized.entities);

      normalized.result.forEach((playlistId) => {
        const playlist = normalized.entities.playlists[playlistId];
        receiveSongs(context, playlist.tracks, playlist.title + AUTHED_PLAYLIST_SUFFIX);
      });
    })
    .catch((err) => { throw err; });
}

function receiveAuthedPlaylists({ commit }, playlists) {
  commit(types.RECEIVE_AUTHED_PLAYLISTS, playlists);
}

function fetchFollowings(context, accessToken) {
  fetch(`${SC_API_URL}/me/followings?oauth_token=${accessToken}`)
    .then(response => response.json())
    .then((json) => {
      console.log('fetchFollowings');
      console.log(json);
      return normalize(json.collection, arrayOf(userSchema));
    })
    .then((normalized) => {
      const users = normalized.result
        .reduce((obj, userId) => Object.assign({}, obj, { [userId]: 1 }), {});
      receiveEntities(context, normalized.entities);
      receiveAuthedFollowings(context, users);
    })
    .catch((err) => { throw err; });
}

function receiveAuthedFollowings({ commit }, users) {
  console.log('receiveAuthedFollowings');
  commit(types.RECEIVE_AUTHED_FOLLOWINGS, users);
}

export function loginUser(context, shouldShowStream = true) {
  SC.initialize({
    client_id: CLIENT_ID,
    redirect_uri: `${window.location.protocol}//${window.location.host}/api/callback`,
  });

  SC.connect()
    .then((authObj) => {
      console.log(authObj);
      Cookies.set(COOKIE_PATH, authObj.oauth_token);

      authUser(context, authObj.oauth_token, shouldShowStream);
    })
    .catch((err) => { throw err; });
}

export function logoutUser(context) {
  console.log('logout');
  Cookies.remove(COOKIE_PATH);

  const { authed, entities } = context.rootState;
  const playlists = authed.playlists.map(playlistId =>
    entities.playlists[playlistId].title + AUTHED_PLAYLIST_SUFFIX,
  );

  // navigateTo
  if (router.currentRoute.path.indexOf('me') > -1) {
    router.push({ name: 'songs' });
  }

  // reset
  resetAuthed(context, playlists);
}

function resetAuthed({ commit }, playlists) {
  commit(types.RESET_AUTHED, playlists);
}

export function toggleLike(context, songId) {
  const { accessToken, authedLikes, selectedPlaylists, currentSongIndex } = context.getters;

  const liked = songId in authedLikes && authedLikes[songId] === 1 ? 0 : 1;

  if (!(songId in authedLikes)) {
    // add to playlists
    appendLike(context, songId);
    // if is playing likes playlist now
    if (currentSongIndex !== null
      && selectedPlaylists[selectedPlaylists.length - 1] === `likes${AUTHED_PLAYLIST_SUFFIX}`) {
      changePlayingSong(context, currentSongIndex + 1);
    }
  }

  setLike(context, {
    songId,
    liked,
  });

  syncLike(accessToken, songId, liked);
}

function appendLike({ commit }, songId) {
  commit(types.APPEND_LIKE, songId);
}

function setLike({ commit }, payload) {
  commit(types.SET_LIKE, payload);
}

function syncLike(accessToken, songId, liked) {
  fetch(
    `${SC_API_URL}/me/favorites/${songId}?oauth_token=${accessToken}`,
    { method: liked ? 'put' : 'delete' },
  );
}

export function toggleFollow(context, userId) {
  const { authedFollowings, accessToken } = context.getters;
  const following = userId in authedFollowings && authedFollowings[userId] === 1 ? 0 : 1;

  setFollowing(context, userId, following);
  syncFollowing(accessToken, userId, following);
}

function setFollowing({ commit }, userId, following) {
  commit(types.SET_FOLLOWING, {
    userId,
    following,
  });
}

function syncFollowing(accessToken, userId, following) {
  fetch(
    `${SC_API_URL}/me/followings/${userId}?oauth_token=${accessToken}`,
    { method: following ? 'put' : 'delete' },
  );
}
