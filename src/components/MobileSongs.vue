<template>
  <MobileSongsList
    :playingSongId="playingSongId"
    :playlist="playlist"
    :playlistData="playlistData"
    :songEntities="songEntities"
    :userEntities="userEntities"
  >
  </MobileSongsList>
</template>

<style></style>

<script>
  import MobileSongsList from './MobileSongsList.vue';

  export default {
    components: {
      MobileSongsList,
    },
    watch: {
      playlist(nextPlaylist) {
        const { playlistData } = this;
        if (!playlistData.items || playlistData.items.length === 0) {
          this.$store.dispatch('fetchSongsIfNeeded', nextPlaylist);
        }
      },
    },
    beforeMount() {
      const { playlist, playlistData } = this;
      if (!playlistData.items || playlistData.items.length === 0) {
        this.$store.dispatch('fetchSongsIfNeeded', playlist);
      }
    },
    props: {
      authedLikes: {
        type: Object,
        required: true,
      },
      authedUser: Object,
      eHeight: Number,
      playingSongId: Number,
      playlist: {
        type: String,
        required: true,
      },
      playlistData: {
        type: Object,
        required: true,
      },
      songEntities: {
        type: Object,
        required: true,
      },
      time: Number,
      userEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
