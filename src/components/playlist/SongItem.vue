<template>
  <li class="playlist-song" :class="{ active: isActiveSong }" @click="playSong(index)">
    <img class="playlist-song-image" :src="img" alt="Song artwork">
    <div class="playlist-song-title">{{ song.title }}</div>
  </li>
</template>

<style>

</style>

<script>
  import { getImageUrl } from '../../utils/SongUtils';

  export default {
    computed: {
      img() {
        return getImageUrl(this.song.artwork_url);
      },
    },
    props: {
      song: {
        type: Object,
        required: true,
      },
      isActiveSong: {
        type: Boolean,
        required: true,
      },
      playSong: {
        type: Function,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
    },
  };
</script>
