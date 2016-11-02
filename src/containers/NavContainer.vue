<template>
  <c-nav
    :authedPlaylists="authedPlaylists"
    :authedUser="authedUser"
    :playlistEntities="playlistEntities"
    :songEntities="songEntities"
  >
  </c-nav>
</template>

<style lang="sass">
</style>

<script>
  import { mapGetters } from 'vuex';

  import cNav from '../components/Nav.vue';

  export default {
    components: {
      cNav,
    },
    computed: {
      ...mapGetters(['authedPlaylists', 'authedUser', 'playlistEntities', 'songEntities']),
    },
  };
</script>
