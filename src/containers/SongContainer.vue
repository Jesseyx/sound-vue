<template>
  <Song
    :authedUser="authedUser"
    :authedLikes="authedLikes"
    :currentTime="currentTime"
    :eHeight="eHeight"
    :playingSongId="playingSongId"
    :playlists="playlists"
    :songId="songId"
    :songEntities="songEntities"
    :userEntities="userEntities"
  >
  </Song>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Song from '../components/Song.vue';

  export default {
    components: {
      Song,
    },
    computed: {
      ...mapGetters(['authedUser', 'authedLikes', 'currentTime', 'eHeight', 'playingSongId', 'playlists', 'songEntities', 'userEntities']),
      songId() {
        return this.$route.params.id;
      },
    },
  };
</script>
