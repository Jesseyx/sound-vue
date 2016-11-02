<template>
  <songs
    :authedLikes="authedLikes"
    :authedUser="authedUser"
    :eHeight="eHeight"
    :playingSongId="playingSongId"
    :playlist="info.playlist"
    :playlistData="playlistData"
    :songEntities="songEntities"
    :time="info.time"
    :userEntities="userEntities"
  >
  </songs>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Songs from '../components/Songs.vue';

  export default {
    components: {
      Songs,
    },
    computed: {
      ...mapGetters(['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlists', 'songEntities', 'userEntities']),
      info() {
        const info = {};
        const { query } = this.$route;

        const time = query && query.t ? query.t : null;
        let playlist = query && query.q ? query.q : 'house';
        if (time) {
          playlist = `${playlist} - ${time}`;
        }

        return {
          time,
          playlist,
        };
      },
      playlistData() {
        const { info, playlists } = this;
        const { playlist } = info;
        return playlist in playlists ? playlists[playlist] : {};
      },
    },
  };
</script>
