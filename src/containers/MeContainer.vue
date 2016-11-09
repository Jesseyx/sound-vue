<template>
  <me
    :authedLikes="authedLikes"
    :authedUser="authedUser"
    :eHeight="eHeight"
    :playingSongId="playingSongId"
    :playlist="playlist"
    :playlistData="playlistData"
    :songEntities="songEntities"
    :userEntities="userEntities"
  >
  </me>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Me from '../components/Me.vue';

  import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

  export default {
    components: {
      Me,
    },
    computed: {
      ...mapGetters(['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlistEntities', 'playlists', 'songEntities', 'userEntities']),
      playlistName() {
        const { playlistEntities } = this;
        const { name, params } = this.$route;

        switch (name) {
          case 'stream':
            return 'stream';
          case 'likes':
            return 'likes';
          case 'playlists':
            if (!params.id || !(params.id in playlistEntities)) {
              return 'playlists';
            }

            return playlistEntities[params.id].title;
          default:
            return 'stream';
        }
      },
      playlist() {
        return this.playlistName + AUTHED_PLAYLIST_SUFFIX;
      },
      playlistData() {
        const { playlist, playlists } = this;
        return playlist in playlists ? playlists[playlist] : {};
      },
    },
  };
</script>
