import { normalize, arrayOf } from 'normalizr';

import * as types from '../../constants/mutation-types';
import { GENRES_MAP } from '../../constants/SongConstants';
import { songSchema } from '../../constants/Schemes';

export function fetchSongs(context, { url, playlist }) {
  context.commit(types.REQUEST_SONGS, playlist);
  // context.commit(types.REQUEST_SONGS, 'testPlaylist');

  const { authed } = context.rootState;
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      let nextUrl = null;
      let futureUrl = null;
      if (json.next_href) {
        nextUrl = json.next_href;
        nextUrl += (authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
      }

      if (json.future_href) {
        futureUrl = json.future_href;
        futureUrl += (authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
      }

      const songs = json.collection
        .map(song => song.origin || song)
        .filter((song) => {
          if (playlist in GENRES_MAP) {
            return song.streamable && song.kind === 'track' && song.duration < 600000;
          }

          return song.streamable && song.kind === 'track';
        });

      const normalized = normalize(songs, arrayOf(songSchema));
      console.log(normalized);

      const result = normalized.result.reduce((arr, songId) => {
        if (arr.indexOf(songId) === -1) {
          arr.push(songId);
        }

        return arr;
      }, []);

      receiveSongs(context, normalized.entities, result, playlist, nextUrl, futureUrl)
    })
    .catch((err) => { throw err; });
}

export function receiveSongs({ commit }, entities, songs, playlist, nextUrl = null, futureUrl = null) {
  commit(types.RECEIVE_ENTITIES, entities);
  commit(types.RECEIVE_SONGS, {
    songs,
    playlist,
    nextUrl,
    futureUrl,
  });
}
