<template>
  <component
    :is="currentView"
    :authedPlaylists="authedPlaylists"
    :authedUser="authedUser"
    :playlistEntities="playlistEntities"
    :songEntities="songEntities"
  >
  </component>
</template>

<style lang="sass">
</style>

<script>
  import { mapGetters } from 'vuex';

  import cNav from '../components/Nav.vue';
  import MobileNav from '../components/MobileNav.vue';

  export default {
    data() {
      return {
        currentView: cNav,
      };
    },
    components: {
      cNav,
      MobileNav,
    },
    computed: {
      ...mapGetters(['authedPlaylists', 'authedUser', 'playlistEntities', 'songEntities', 'isMobile']),
    },
    watch: {
      isMobile(newIsMobile) {
        if (newIsMobile) {
          this.currentView = 'MobileNav';
        }
      },
    },
  };
</script>
