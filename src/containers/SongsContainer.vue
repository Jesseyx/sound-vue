<template>
  <songs
    :playlists="playlists"
    :songEntities="songEntities"
    :userEntities="userEntities"
    :authedUser="authedUser"
    :time="info.time"
    :playlist="info.playlist"
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
      ...mapGetters(['playlists', 'songEntities', 'userEntities', 'authedUser']),
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
    },
  };
</script>
