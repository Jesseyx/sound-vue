/* eslint-disable no-unused-vars */
import { normalize, arrayOf } from 'normalizr';
import { constructSongUrl, constructUserSongsUrl, constructSongCommentsUrl } from '../../utils/SongUtils';
import * as types from '../../constants/mutation-types';
import { songSchema } from '../../constants/Schemes';
import { receiveEntities } from './entities';
import { receiveSongs } from './playlists';
import { SONG_PLAYLIST_SUFFIX } from '../../constants/PlaylistConstants';

export function fetchSongIfNeeded(context, songId) {
  const { songEntities, playlists } = context.getters;

  if (!(songId in songEntities) || songEntities[songId].waveform_url.indexOf('json') > -1) {
    fetchSong(context, songId);
  } else {
    const song = songEntities[songId];
    const songPlaylistKey = song.title + SONG_PLAYLIST_SUFFIX;

    if (!(songPlaylistKey in playlists)) {
      receiveSongs(context, [songId], songPlaylistKey, null);
    }

    if (!('comments' in song)) {
      fetchSongData(context, songId, song.user_id, song.title);
    }
  }
}

function fetchSong(context, songId) {
  // requestSong(context, songId);

  return fetch(constructSongUrl(songId))
    .then(response => response.json())
    .then((json) => {
      const normalized = normalize(json, songSchema);
      receiveSongPre(context, songId, normalized.entities);
    })
    .catch((err) => { throw err; });
}

function requestSong({ commit }, songId) {
  commit(types.REQUEST_SONG, songId);
}

function receiveSongPre(context, songId, entities) {
  const songTitle = entities.songs[songId].title;
  const userId = entities.songs[songId].user_id;

  receiveEntities(context, entities);
  // receiveSong(context, songId);
  receiveSongs(context, [songId], songTitle + SONG_PLAYLIST_SUFFIX, null);
  fetchSongData(context, songId, userId, songTitle);
}

function receiveSong({ commit }, songId) {
  commit(types.RECEIVE_SONG, songId);
}

function fetchSongData(context, songId, userId, songTitle) {
  fetchRelatedSongs(context, userId, songTitle);
  fetchSongComments(context, songId);
}

function fetchRelatedSongs(context, userId, songTitle) {
  return fetch(constructUserSongsUrl(userId))
    .then(response => response.json())
    .then((json) => {
      const songs = json.filter(song => songTitle !== song.title);
      const normalized = normalize(songs, arrayOf(songSchema));

      receiveEntities(context, normalized.entities);
      receiveSongs(context, normalized.result, songTitle + SONG_PLAYLIST_SUFFIX, null);
    })
    .catch((err) => { throw err; });
}

function fetchSongComments(context, songId) {
  return fetch(constructSongCommentsUrl(songId))
    .then(response => response.json())
    .then((json) => {
      const entities = { songs: { [songId]: { comments: json } } };
      receiveEntities(context, entities);
      // receiveSongComments(context, songId);
    })
    .catch((err) => { throw err; });
}

function receiveSongComments({ commit }, songId) {
  commit(types.RECEIVE_SONG_COMMENTS, songId);
}
