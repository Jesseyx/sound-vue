<template>
  <img
    class="nav-playlist-image"
    :src="src"
    alt="Song artwork"
  >
</template>

<style></style>

<script>
  import { getImageUrl } from '../../utils/SongUtils';

  export default {
    computed: {
      src() {
        return getImageUrl(this.song.artwork_url);
      },
    },
    props: ['song'],
  };
</script>
