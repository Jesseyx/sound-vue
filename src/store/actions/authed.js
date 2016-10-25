import SC from 'soundcloud';
import Cookies from 'js-cookie';

import { CLIENT_ID } from '../constants/Config';
import { SC_API_URL } from '../constants/Api';
import * as types from '../constants/mutation-types';
import { fetchSongs } from './playlists';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

const COOKIE_PATH = 'accessToken';

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
}

function fetchStream(context, accessToken) {
  // initInterval(accessToken);
  fetchSongs(context, {
    url: `${SC_API_URL}/me/activities/tracks/affiliated?limit=50&oauth_token=${accessToken}`,
    playlist: `stream${AUTHED_PLAYLIST_SUFFIX}`,
  });
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
