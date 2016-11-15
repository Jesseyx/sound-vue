<template>
  <ul class="playlist-songs">
    <SongItem
      v-for="(songId, i) in songsId"
      :song="songEntities[songId]"
      :isActiveSong="playerIsShownCurrentPlaylist && currentSongIndex === i"
      :playSong="playSong"
      :index="i"
      :key="`${songId}-${i}`"
    >
    </SongItem>
  </ul>
</template>

<style></style>

<script>
  import SongItem from './SongItem.vue';

  export default {
    components: {
      SongItem,
    },
    props: {
      songsId: {
        type: Array,
        required: true,
      },
      songEntities: {
        type: Object,
        required: true,
      },
      currentSongIndex: {
        type: Number,
        required: true,
      },
      playerIsShownCurrentPlaylist: {
        type: Boolean,
        required: true,
      },
      playSong: {
        type: Function,
        required: true,
      },
    },
  };
</script>
