<template>
  <components
    :is="currentView"
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
  </components>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Songs from '../components/Songs.vue';
  import MobileSongs from '../components/MobileSongs.vue';

  export default {
    data() {
      const { isMobile } = this;
      const currentView = isMobile ? 'MobileSongs' : 'Songs';
      return {
        currentView,
      };
    },
    components: {
      Songs,
      MobileSongs,
    },
    computed: {
      ...mapGetters(['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlists', 'songEntities', 'userEntities']),
      info() {
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
    watch: {
      isMobile(newIsMobile) {
        this.currentView = newIsMobile ? 'MobileSongs' : 'Songs';
      },
    },
    props: {
      isMobile: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
