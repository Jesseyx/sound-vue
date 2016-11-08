<template>
  <ul class="playlist-songs">
    <song-item
      v-for="(songId, i) in songsId"
      :song="songEntities[songId]"
      :isActiveSong="playerIsShownCurrentPlaylist && currentSongIndex === i"
      :playSong="playSong"
      :index="i"
      :key="`${songId}-${i}`"
    >
    </song-item>
  </ul>
</template>

<style></style>

<script>
  import SongItem from './SongItem.vue';

  export default {
    components: {
      SongItem,
    },
    props: ['songsId', 'songEntities', 'currentSongIndex', 'playerIsShownCurrentPlaylist', 'playSong'],
  };
</script>
