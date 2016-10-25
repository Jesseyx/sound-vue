import { Schema, arrayOf } from 'normalizr';

const song = new Schema('songs');
const user = new Schema('users');
const playlist = new Schema('playlists');

song.define({
  user,
});

playlist.define({

});

export const songSchema = song;
export const userSchema = user;
export const playlistSchema = playlist;
