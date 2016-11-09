import { normalize, arrayOf } from 'normalizr';
import merge from 'lodash/merge';

import * as types from '../../constants/mutation-types';
import {
  constructUserUrl,
  constructUserTracksUrl,
  constructUserFollowingsUrl,
  constructUserProfilesUrl,
} from '../../utils/UserUtils';
import { userSchema, songSchema } from '../../constants/Schemes';
import { receiveEntities } from './entities';
import { USER_PLAYLIST_SUFFIX } from '../../constants/PlaylistConstants';
import { receiveSongs } from './playlists';

export function fetchUserIfNeeded(context, userId) {
  const { userEntities } = context.getters;

  if (!(userId in userEntities) || !userEntities[userId].description) {
    fetchUser(context, userId);
  } else if (!('followings' in userEntities[userId])) {
    fetchUserData(context, userId, userEntities[userId].username);
  }
}

function fetchUser(context, userId) {
  // requestUser(context, userId);

  return fetch(constructUserUrl(userId))
    .then(response => response.json())
    .then((json) => {
      const normalized = normalize(json, userSchema);
      receiveUserPre(context, userId, normalized.entities);
    })
    .catch((err) => { throw err; });
}

/* eslint-disable no-unused-vars */
function requestUser({ commit }, userId) {
  commit(types.REQUEST_USER, userId);
}

function receiveUserPre(context, userId, entities) {
  receiveEntities(context, entities);
  // receiveUser(context, userId);
  fetchUserData(context, userId, entities.users[userId].username);
}

export function receiveUser({ commit }, userId) {
  commit(types.RECEIVE_USER, userId);
}

function fetchUserData(context, userId, username) {
  fetchUserTracks(context, userId, username);
  fetchUserFollowings(context, userId);
  fetchUserProfiles(context, userId);
}

function fetchUserTracks(context, userId, username) {
  return fetch(constructUserTracksUrl(userId))
    .then(response => response.json())
    .then((json) => {
      const normalized = normalize(json, arrayOf(songSchema));
      receiveEntities(context, normalized.entities);
      receiveSongs(context, normalized.result, username + USER_PLAYLIST_SUFFIX, null);
    })
    .catch((err) => { throw err; });
}

function fetchUserFollowings(context, userId) {
  return fetch(constructUserFollowingsUrl(userId))
    .then(response => response.json())
    .then((json) => {
      const users = json.collection.sort((a, b) => b.followers_count - a.followers_count);
      const normalized = normalize(users, arrayOf(userSchema));

      const entities = merge({}, normalized.entities, {
        users: {
          [userId]: { followings: normalized.result },
        },
      });

      receiveEntities(context, entities);
      // receiveUserFollowings(context, userId);
    })
    .catch((err) => { throw err; });
}

/* eslint-disable no-unused-vars */
function receiveUserFollowings({ commit }, userId) {
  commit(types.RECEIVE_USER_FOLLOWINGS, userId);
}

function fetchUserProfiles(context, userId) {
  return fetch(constructUserProfilesUrl(userId))
    .then(response => response.json())
    .then((json) => {
      const entities = { users: { [userId]: { profiles: json } } };

      receiveEntities(context, entities);
      // receiveUserProfiles(context, userId);
    })
    .catch((err) => { throw err; });
}

/* eslint-disable no-unused-vars */
function receiveUserProfiles({ commit }, userId) {
  commit(types.RECEIVE_USER_PROFILES, userId);
}
