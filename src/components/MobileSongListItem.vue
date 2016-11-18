<template>
  <a class="mobile-song-list-item" :class="{ active: isActive }" href="#" @click.prevent="playSong(index)">
    <img class="mobile-song-list-item-image" :src="artworkUrl" alt="Song artwork">

    <div class="mobile-song-list-item-info">
      <div class="mobile-song-list-item-title">
        {{ song.title }}
      </div>

      <div class="mobile-song-list-item-user">
        {{ user.username }}
      </div>
    </div>
  </a>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';

  export default {
    computed: {
      isActive() {
        const { playingSongId, song } = this;
        return song.id === playingSongId;
      },
      artworkUrl() {
        return getImageUrl(this.song.artwork_url);
      },
    },
    props: {
      index: {
        type: Number,
        required: true,
      },
      playingSongId: Number,
      playSong: {
        type: Function,
        required: true,
      },
      song: {
        type: Object,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
    },
  };
</script>
