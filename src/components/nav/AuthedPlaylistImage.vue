<template>
  <img
    class="nav-playlist-image"
    :src="src"
    alt="Song artwork"
  >
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import { getImageUrl } from '../../utils/SongUtils';

  export default {
    computed: {
      ...mapGetters(['songEntities']),
      src() {
        return getImageUrl(this.songEntities[this.songId].artwork_url);
      }
    },
    props: ['songId'],
  };
</script>
