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
      const { isMobile } = this;
      const currentView = isMobile ? 'MobileNav' : 'cNav';
      return {
        currentView,
      };
    },
    components: {
      cNav,
      MobileNav,
    },
    computed: {
      ...mapGetters(['authedPlaylists', 'authedUser', 'playlistEntities', 'songEntities']),
    },
    watch: {
      isMobile(newIsMobile) {
        this.currentView = newIsMobile ? 'MobileNav' : 'cNav';
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
