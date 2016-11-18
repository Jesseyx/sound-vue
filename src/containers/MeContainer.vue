<template>
  <component
    :is="currentView"
    :authedLikes="authedLikes"
    :authedUser="authedUser"
    :eHeight="eHeight"
    :playingSongId="playingSongId"
    :playlist="playlist"
    :playlistData="playlistData"
    :songEntities="songEntities"
    :userEntities="userEntities"
  >
  </component>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Me from '../components/Me.vue';
  import MobileMe from '../components/MobileMe.vue';

  import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

  export default {
    data() {
      const { isMobile } = this;
      const currentView = isMobile ? 'MobileMe' : 'Me';

      return {
        currentView,
      };
    },
    components: {
      Me,
      MobileMe,
    },
    computed: {
      ...mapGetters(['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlistEntities', 'playlists', 'songEntities', 'userEntities', 'isMobile']),
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
    watch: {
      isMobile(newIsMobile) {
        if (newIsMobile) {
          this.currentView = 'MobileMe';
        }
      },
    },
  };
</script>
