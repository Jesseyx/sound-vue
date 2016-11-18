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
      userEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
